import path from 'node:path';
import { color, logger, RockError, spawn, spinner } from '@rock-js/tools';
import { readKeyFromPlist } from '../../utils/plist.js';
export async function launchSimulator(device) {
    if (device.type !== 'simulator') {
        // bail if device is not a simulator
        return undefined;
    }
    /**
     * Booting simulator through `xcrun simctl boot` will boot it in the `headless` mode
     * (running in the background).
     *
     * In order for user to see the app and the simulator itself, we have to make sure
     * that the Simulator.app is running.
     *
     * We also pass it `-CurrentDeviceUDID` so that when we launch it for the first time,
     * it will not boot the "default" device, but the one we set. If the app is already running,
     * this flag has no effect.
     */
    const { output: activeDeveloperDir } = await spawn('xcode-select', ['-p'], {
        stdio: 'pipe',
    });
    await spawn('open', [
        `${activeDeveloperDir}/Applications/Simulator.app`,
        '--args',
        '-CurrentDeviceUDID',
        device.udid,
    ]);
    if (device.state !== 'Booted') {
        await bootSimulator(device);
    }
}
export async function runOnSimulator(device, binaryPath, infoPlistPath) {
    const loader = spinner();
    loader.start(`Installing the app on ${color.bold(device.name)}`);
    await installAppOnSimulator(device.udid, binaryPath);
    loader.message(`Launching the app on ${color.bold(device.name)}`);
    await launchAppOnSimulator(device.udid, binaryPath, infoPlistPath);
    loader.stop(`Installed and launched the app on ${color.bold(device.name)}.`);
}
async function bootSimulator(selectedSimulator) {
    try {
        await spawn('xcrun', ['simctl', 'boot', selectedSimulator.udid]);
    }
    catch (error) {
        if (
        // It may happen on GitHub Actions when the simulator is already booted,
        // even though the simctl returns its state as Shutdown
        error.stderr.includes('Unable to boot device in current state: Booted')) {
            logger.debug(`Simulator ${selectedSimulator.udid} already booted. Skipping.`);
            return;
        }
        throw new RockError('Failed to boot Simulator', {
            cause: error.stderr,
        });
    }
}
export default async function installAppOnSimulator(udid, binaryPath) {
    logger.debug(`Installing "${path.basename(binaryPath)}"`);
    try {
        await spawn('xcrun', ['simctl', 'install', udid, binaryPath]);
    }
    catch (error) {
        throw new RockError('Failed to install the app on Simulator', {
            cause: error.stderr,
        });
    }
}
export async function launchAppOnSimulator(udid, binaryPath, infoPlistPath) {
    const infoPlist = binaryPath
        ? // @todo Info.plist is hardcoded when reading from binaryPath
            path.join(binaryPath, 'Info.plist')
        : infoPlistPath;
    const bundleID = await readKeyFromPlist(infoPlist, 'CFBundleIdentifier');
    logger.debug(`Launching "${bundleID}"`);
    try {
        await spawn('xcrun', ['simctl', 'launch', udid, bundleID]);
    }
    catch (error) {
        throw new RockError(`Failed to launch the app on Simulator`, {
            cause: error.stderr,
        });
    }
}
//# sourceMappingURL=runOnSimulator.js.map