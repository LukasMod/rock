import path from 'node:path';
import { color, logger, RockError, spawn } from '@rock-js/tools';
export async function getBuildSettings({ xcodeProject, sourceDir, platformName, configuration, destinations, scheme, target, buildFolder, }) {
    const destination = destinations[0];
    const sdk = destination.match(/simulator/i)
        ? getSimulatorPlatformSDK(platformName)
        : getDevicePlatformSDK(platformName);
    const { stdout: buildSettingsOutput } = await spawn('xcodebuild', [
        xcodeProject.isWorkspace ? '-workspace' : '-project',
        xcodeProject.name,
        ...(buildFolder ? ['-derivedDataPath', buildFolder] : []),
        '-scheme',
        scheme,
        '-configuration',
        configuration,
        '-sdk',
        sdk,
        // -showBuildSettings supports exactly one -destination argument
        '-destination',
        destination,
        '-showBuildSettings',
        '-json',
    ], { cwd: sourceDir, stdio: 'pipe' });
    const settings = JSON.parse(buildSettingsOutput).filter(({ buildSettings: { WRAPPER_EXTENSION }, }) => WRAPPER_EXTENSION === 'app' || WRAPPER_EXTENSION === 'framework');
    const targets = settings.map(({ target: settingsTarget }) => settingsTarget);
    if (settings.length === 0) {
        throw new RockError(`Failed to get build settings for your project. Looking for "app" or "framework" wrapper extensions but found none.`);
    }
    let selectedTarget = targets[0];
    if (target) {
        if (!targets.includes(target)) {
            logger.info(`Target ${color.bold(target)} not found for scheme ${color.bold(scheme)}, automatically selected target ${color.bold(selectedTarget)}`);
        }
        else {
            selectedTarget = target;
        }
    }
    logger.debug(`Selected target: ${selectedTarget}`);
    // Find app in all building settings - look for WRAPPER_EXTENSION: 'app',
    const targetIndex = targets.indexOf(selectedTarget);
    const buildSettings = settings[targetIndex].buildSettings;
    if (!buildSettings) {
        throw new RockError('Failed to get build settings for your project');
    }
    const appPath = getBuildPath(buildSettings, platformName);
    const infoPlistPath = buildSettings.INFOPLIST_PATH;
    const targetBuildDir = buildSettings.TARGET_BUILD_DIR;
    return {
        appPath,
        infoPlistPath: path.join(targetBuildDir, infoPlistPath),
        bundleIdentifier: buildSettings.PRODUCT_BUNDLE_IDENTIFIER,
    };
}
function getBuildPath(buildSettings, platformName) {
    const targetBuildDir = buildSettings.TARGET_BUILD_DIR;
    const executableFolderPath = buildSettings.EXECUTABLE_FOLDER_PATH;
    const fullProductName = buildSettings.FULL_PRODUCT_NAME;
    if (!targetBuildDir) {
        throw new Error('Failed to get the target build directory.');
    }
    if (!executableFolderPath) {
        throw new Error('Failed to get the app name.');
    }
    if (!fullProductName) {
        throw new Error('Failed to get product name.');
    }
    if (platformName === 'macos') {
        return path.join(targetBuildDir, fullProductName);
    }
    else {
        return path.join(targetBuildDir, executableFolderPath);
    }
}
function getSimulatorPlatformSDK(platform) {
    switch (platform) {
        case 'ios':
            return 'iphonesimulator';
        case 'macos':
            return 'macosx';
        case 'tvos':
            return 'appletvsimulator';
        case 'visionos':
            return 'xrsimulator';
    }
}
function getDevicePlatformSDK(platform) {
    switch (platform) {
        case 'ios':
            return 'iphoneos';
        case 'macos':
            return 'macosx';
        case 'tvos':
            return 'appletvos';
        case 'visionos':
            return 'xr';
    }
}
//# sourceMappingURL=getBuildSettings.js.map