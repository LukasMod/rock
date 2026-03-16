import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { cacheManager, color, colorLink, getReactNativeVersion, logger, RockError, spawn, spinner, } from '@rock-js/tools';
import runCodegen from './codegen.js';
const podErrorHelpMessage = `Please make sure your environment is correctly set up. 
Learn more at: ${color.dim('https://cocoapods.org/')}
To skip automatic CocoaPods installation run with "--no-install-pods" flag after installing CocoaPods manually.`;
export async function installPodsIfNeeded(projectRoot, platformName, sourceDir, newArch, reactNativePath, brownfield, usePrebuiltRNCore) {
    const podsPath = path.join(sourceDir, 'Pods');
    const podfilePath = path.join(sourceDir, 'Podfile');
    // There's a possibility to define a custom dependencies in `react-native.config.js`, that contain native code for a platform and that should also trigger install CocoaPods
    const nativeDependencies = await getNativeDependencies(platformName);
    const cacheKey = `pods-dependencies`;
    const cachedDependenciesHash = cacheManager.get(cacheKey);
    const podsDirExists = fs.existsSync(podsPath);
    const hashChanged = cachedDependenciesHash
        ? !compareMd5Hashes(calculateCurrentHash({ podfilePath, podsPath, nativeDependencies }), cachedDependenciesHash)
        : true;
    if (!podsDirExists || hashChanged) {
        await runCodegen({ projectRoot, platformName, reactNativePath, sourceDir });
        await installPods({
            projectRoot,
            sourceDir,
            podfilePath,
            newArch,
            brownfield,
            usePrebuiltRNCore,
        });
        cacheManager.set(cacheKey, calculateCurrentHash({ podfilePath, podsPath, nativeDependencies }));
        return true;
    }
    return false;
}
const calculateCurrentHash = ({ podfilePath, podsPath, nativeDependencies, }) => {
    const podfileLockPath = podfilePath + '.lock';
    const manifestLockPath = path.join(podsPath, 'Manifest.lock');
    let podfile;
    try {
        podfile = fs.readFileSync(podfilePath, 'utf-8');
    }
    catch {
        throw new RockError(`No Podfile found at: ${podfilePath}.
${podErrorHelpMessage}`);
    }
    let podfileLock;
    try {
        podfileLock = fs.readFileSync(podfileLockPath, 'utf-8');
    }
    catch {
        logger.debug('No Podfile.lock, continue');
    }
    return generateDependenciesHash([
        generateMd5Hash(podfile),
        generateMd5Hash(podfileLock ?? ''),
        getLockfileChecksum(podfileLockPath),
        getLockfileChecksum(manifestLockPath),
        generateDependenciesHash(nativeDependencies),
    ]);
};
async function runPodInstall(options) {
    if (!options.useBundler) {
        await validatePodCommand(options.sourceDir);
    }
    // Remove build folder to avoid codegen path clashes when developing native modules
    if (fs.existsSync('./build')) {
        fs.rmSync('build', { recursive: true });
    }
    const shouldHandleRepoUpdate = options?.shouldHandleRepoUpdate || true;
    const loader = spinner({ indicator: 'timer' });
    loader.start('Installing CocoaPods dependencies');
    const reactNativeVersion = await getReactNativeVersion(options.projectRoot);
    const isReactNative81OrHigher = reactNativeVersion.localeCompare('0.81.0', undefined, {
        numeric: true,
        sensitivity: 'base',
    }) >= 0;
    const usePrebuiltReactNative = !options.brownfield && isReactNative81OrHigher;
    const command = options.useBundler ? 'bundle' : 'pod';
    const args = options.useBundler ? ['exec', 'pod', 'install'] : ['install'];
    try {
        await spawn(command, args, {
            env: {
                RCT_NEW_ARCH_ENABLED: options.newArch ? '1' : '0',
                RCT_IGNORE_PODS_DEPRECATION: '1',
                RCT_USE_RN_DEP: String(process.env['RCT_USE_RN_DEP'] ??
                    options.usePrebuiltRNCore ??
                    (usePrebuiltReactNative ? 1 : 0)),
                RCT_USE_PREBUILT_RNCORE: String(process.env['RCT_USE_PREBUILT_RNCORE'] ??
                    options.usePrebuiltRNCore ??
                    (usePrebuiltReactNative ? 1 : 0)),
                ...(options.brownfield && { USE_FRAMEWORKS: 'static' }),
                ...(process.env['USE_THIRD_PARTY_JSC'] && {
                    USE_THIRD_PARTY_JSC: process.env['USE_THIRD_PARTY_JSC'],
                }),
            },
            cwd: options.sourceDir,
        });
    }
    catch (error) {
        loader.stop('Failed: Installing CocoaPods dependencies', 1);
        const stderr = error.stderr;
        const fullOutput = error.output;
        let errorMessage = stderr;
        /**
         * CocoaPods occasionally provides a markdown template with error message.
         * We don't need the part above the Error secion.
         */
        if (fullOutput.includes('### Error')) {
            errorMessage = fullOutput.split('### Error')[1].trim();
        }
        /**
         * If CocoaPods failed due to repo being out of date, it will
         * include the update command in the error message.
         *
         * `shouldHandleRepoUpdate` will be set to `false` to
         * prevent infinite loop (unlikely scenario)
         */
        if (fullOutput.includes('pod repo update') && shouldHandleRepoUpdate) {
            await runPodUpdate(options.sourceDir, options.useBundler);
            await runPodInstall({
                shouldHandleRepoUpdate: false,
                sourceDir: options.sourceDir,
                newArch: options.newArch,
                useBundler: options.useBundler,
                brownfield: options.brownfield,
                projectRoot: options.projectRoot,
                usePrebuiltRNCore: options.usePrebuiltRNCore,
            });
        }
        else {
            throw new RockError(`CocoaPods installation failed. 
${podErrorHelpMessage}`, { cause: errorMessage });
        }
    }
    loader.stop('Installed CocoaPods dependencies successfully');
}
async function runPodUpdate(cwd, useBundler) {
    const loader = spinner({ indicator: 'timer' });
    try {
        loader.start('Updating CocoaPods repositories');
        if (useBundler) {
            await spawn('bundle', ['exec', 'pod', 'repo', 'update'], { cwd });
        }
        else {
            await spawn('pod', ['repo', 'update'], { cwd });
        }
    }
    catch (error) {
        const stderr = error.stderr || error.stdout;
        loader.stop('Failed: Updating CocoaPods repositories', 1);
        throw new RockError(`Failed to update CocoaPods repositories for iOS project.
${podErrorHelpMessage}`, { cause: stderr });
    }
}
async function installPods(options) {
    if (!fs.existsSync(options.podfilePath)) {
        logger.debug(`No Podfile at ${options.podfilePath}. Skipping pod installation.`);
        return;
    }
    const useBundler = await runBundleInstall(options.sourceDir, options.projectRoot);
    if (!useBundler) {
        logger.info('Unable to use Ruby bundler, falling back to "pod install"');
    }
    await runPodInstall({
        sourceDir: options.sourceDir,
        newArch: options.newArch,
        useBundler,
        brownfield: options.brownfield,
        projectRoot: options.projectRoot,
        usePrebuiltRNCore: options.usePrebuiltRNCore,
    });
}
/*
 * Check if "pod" is available and usable. It happens that there are
 * multiple versions of "pod" command and even though it's there, it exits
 * with a failure
 */
async function validatePodCommand(sourceDir) {
    try {
        await spawn('pod', ['--version'], { cwd: sourceDir });
    }
    catch (error) {
        const cause = error.cause;
        if (cause instanceof Error && cause.message.includes('ENOENT')) {
            throw new RockError(`The "pod" command is not available.
${podErrorHelpMessage}`);
        }
        const stderr = error.stderr || error.stdout;
        throw new RockError(`CocoaPods "pod" command failed.
${podErrorHelpMessage}`, { cause: stderr });
    }
}
function checkGemfileForCocoaPods(gemfilePath) {
    try {
        const gemfileContent = fs.readFileSync(gemfilePath, 'utf-8');
        // Check for common CocoaPods gem declarations, because some projects might have Gemfile but for other purposes
        return /^\s*gem\s+['"]cocoapods['"]/m.test(gemfileContent);
    }
    catch (error) {
        logger.debug(`Failed to read Gemfile at: ${gemfilePath}`);
        logger.debug(error);
        return false;
    }
}
async function runBundleInstall(sourceDir, projectRoot) {
    const gemfilePath = path.join(projectRoot, 'Gemfile');
    if (!fs.existsSync(gemfilePath)) {
        logger.debug(`Could not find the Gemfile at: ${colorLink(gemfilePath)}
The default React Native Template uses Gemfile to leverage Ruby Bundler and we advice the same.
If you use Gemfile, make sure it's ${color.bold('in the project root directory')}.
Falling back to installing CocoaPods using globally installed "pod".`);
        return false;
    }
    if (!checkGemfileForCocoaPods(gemfilePath)) {
        logger.debug(`CocoaPods not found in Gemfile at: ${colorLink(gemfilePath)}
skipping Ruby Gems installation.`);
        return false;
    }
    const loader = spinner();
    try {
        loader.start('Installing Ruby Gems');
        await spawn('bundle', ['install'], { cwd: sourceDir });
    }
    catch (error) {
        const stderr = error.stderr || error.stdout;
        loader.stop('Failed: Installing Ruby Gems', 1);
        throw new RockError(`Failed to install Ruby Gems with "bundle install".
${podErrorHelpMessage}`, { cause: stderr });
    }
    loader.stop('Installed Ruby Gems');
    return true;
}
async function getNativeDependencies(platformName) {
    const { loadConfigAsync } = await import('@react-native-community/cli-config');
    const config = await loadConfigAsync({ selectedPlatform: platformName });
    const dependencies = config.dependencies;
    return Object.keys(dependencies)
        .filter((dependency) => dependencies[dependency].platforms?.[platformName])
        .map((dependency) => `${dependency}@${(dependencies[dependency].platforms?.[platformName]).version}`)
        .sort();
}
function generateMd5Hash(text) {
    return createHash('md5').update(text).digest('hex');
}
function compareMd5Hashes(hash1, hash2) {
    return hash1 === hash2;
}
function generateDependenciesHash(deps) {
    return generateMd5Hash(JSON.stringify(deps));
}
/**
 * Gets the checksum of Podfile.lock or Pods/Manifest.lock
 */
function getLockfileChecksum(lockfilePath) {
    try {
        const checksumLine = fs
            .readFileSync(lockfilePath, 'utf8')
            .split('\n')
            .find((line) => line.includes('PODFILE CHECKSUM'));
        if (checksumLine) {
            return checksumLine.split(': ')[1];
        }
    }
    catch (error) {
        logger.debug(`Failed to load the lockfile ${lockfilePath}`, error);
    }
    return '';
}
//# sourceMappingURL=pods.js.map