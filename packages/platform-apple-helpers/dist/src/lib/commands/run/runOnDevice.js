import { color, RockError, spawn, spinner } from '@rock-js/tools';
export async function runOnDevice(selectedDevice, binaryPath, sourceDir, bundleIdentifier) {
    const loader = spinner();
    loader.start(`Installing and launching your app on ${color.bold(selectedDevice.name)}`);
    try {
        await spawn('xcrun', [
            'devicectl',
            'device',
            'install',
            'app',
            '--device',
            selectedDevice.udid,
            binaryPath,
        ], { cwd: sourceDir });
        await spawn('xcrun', [
            'devicectl',
            'device',
            'process',
            'launch',
            '--device',
            selectedDevice.udid,
            bundleIdentifier,
        ], { cwd: sourceDir });
    }
    catch (error) {
        loader.stop(`Failed: Installing and launching your app on ${color.bold(selectedDevice.name)}`);
        throw new RockError(error.stderr);
    }
    loader.stop(`Installed the app on ${color.bold(selectedDevice.name)}.`);
    return;
}
//# sourceMappingURL=runOnDevice.js.map