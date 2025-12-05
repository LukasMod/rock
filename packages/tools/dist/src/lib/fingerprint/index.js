import fs from 'node:fs/promises';
import path from 'node:path';
import { calculateFingerprint } from 'fs-fingerprint';
import { getReactNativeVersion, logger } from '../../index.js';
import { spawn } from '../spawn.js';
import { getAllIgnorePaths } from './ignorePaths.js';
/**
 * Calculates the fingerprint of the native parts project of the project.
 */
export async function nativeFingerprint(projectRoot, options) {
    let autolinkingConfig;
    try {
        // Use stdout to avoid deprecation warnings
        const { stdout: autolinkingConfigString } = await spawn('rock', ['config', '-p', options.platform], { cwd: projectRoot, stdio: 'pipe' });
        autolinkingConfig = JSON.parse(autolinkingConfigString);
    }
    catch {
        throw new Error('Failed to read autolinking config');
    }
    const packageJSONPath = path.join(projectRoot, 'package.json');
    const packageJSON = await readPackageJSON(packageJSONPath);
    const scripts = packageJSON['scripts'];
    const sourceDir = autolinkingConfig.project[options.platform]?.sourceDir;
    if (!options.platform || !sourceDir) {
        throw new Error('No platforms found in autolinking project config');
    }
    let env = undefined;
    if (options.env.length > 0) {
        env = options.env.reduce((acc, key) => {
            acc[key] = process.env[key] ?? '';
            return acc;
        }, {});
    }
    const fingerprint = await calculateFingerprint(projectRoot, {
        include: [
            sourceDir,
            ...options.extraSources.map((source) => path.isAbsolute(source) ? path.relative(projectRoot, source) : source),
        ],
        extraInputs: [
            { key: 'scripts', json: scripts },
            {
                key: 'autolinkingSources',
                json: parseAutolinkingSources(autolinkingConfig),
            },
            {
                key: 'reactNativeVersion',
                json: { version: getReactNativeVersion(projectRoot) },
            },
            ...(env ? [{ key: 'env', json: env }] : []),
        ],
        exclude: [
            ...getAllIgnorePaths(options.platform, sourceDir, projectRoot),
            ...(options.ignorePaths ?? []),
        ],
    });
    return fingerprint;
}
const readPackageJSON = async (packageJSONPath) => {
    try {
        const packageJSONContent = await fs.readFile(packageJSONPath, 'utf-8');
        return JSON.parse(packageJSONContent);
    }
    catch {
        throw new Error(`Failed to read package.json at: ${packageJSONPath}`);
    }
};
function toPosixPath(filePath) {
    return filePath.replace(/\\/g, '/');
}
function parseAutolinkingSources(config) {
    const { root } = config;
    for (const [depName, depData] of Object.entries(config.dependencies)) {
        try {
            stripAutolinkingAbsolutePaths(depData, root);
        }
        catch (e) {
            logger.debug(`Error adding react-native core autolinking - ${depName}.\n${e}`);
        }
    }
    return config.dependencies;
}
function stripAutolinkingAbsolutePaths(dependency, root) {
    const dependencyRoot = dependency.root;
    const posixDependencyRoot = toPosixPath(dependencyRoot);
    dependency.root = toPosixPath(path.relative(root, dependencyRoot));
    for (const platformData of Object.values(dependency.platforms)) {
        for (const [key, value] of Object.entries(platformData ?? {})) {
            const newValue = value?.startsWith?.(posixDependencyRoot)
                ? toPosixPath(path.relative(root, value))
                : value;
            platformData[key] = newValue;
        }
    }
}
//# sourceMappingURL=index.js.map