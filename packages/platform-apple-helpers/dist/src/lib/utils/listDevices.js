import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { RockError, spawn } from '@rock-js/tools';
function parseDevicectlList(devicectlOutput) {
    const devices = devicectlOutput.map((device) => ({
        name: device.deviceProperties.name,
        udid: device.hardwareProperties.udid,
        version: `${device.hardwareProperties.platform} ${device.deviceProperties.osVersionNumber}`,
        platform: getPlatformFromOsVersion(device.hardwareProperties.platform),
        state: device.deviceProperties.bootState === 'booted' ? 'Booted' : 'Shutdown',
        type: 'device',
    }));
    return devices;
}
async function getDevices() {
    const tmpPath = path.resolve(os.tmpdir(), 'iosPhysicalDevices.json'); // same as Minisim.app
    try {
        await spawn('xcrun', ['devicectl', 'list', 'devices', '-j', tmpPath]);
        const output = JSON.parse(fs.readFileSync(tmpPath, 'utf8'));
        return parseDevicectlList(output.result.devices);
    }
    catch (error) {
        throw new RockError('Failed to get devices', {
            cause: error.stderr,
        });
    }
}
async function getSimulators() {
    const { output } = await spawn('xcrun', ['simctl', 'list', 'devices', 'available'], { stdio: 'pipe' });
    return parseSimctlOutput(output);
}
export async function listDevicesAndSimulators(platform) {
    const simulators = await getSimulators();
    const devices = await getDevices();
    return [...simulators, ...devices].filter((device) => device.platform === platform);
}
function parseSimctlOutput(input) {
    const lines = input.split('\n');
    const devices = [];
    const currentOSIdx = 1;
    const deviceNameIdx = 1;
    const identifierIdx = 4;
    const deviceStateIdx = 5;
    let osVersion = '';
    lines.forEach((line) => {
        const currentOsMatch = line.match(/-- (.*?) --/);
        if (currentOsMatch && currentOsMatch.length > 0) {
            osVersion = currentOsMatch[currentOSIdx];
        }
        const deviceMatch = line.match(/(.*?) (\(([0-9.]+)\) )?\(([0-9A-F-]+)\) \((.*?)\)/);
        if (deviceMatch && deviceMatch.length > 0) {
            devices.push({
                name: deviceMatch[deviceNameIdx].trim(),
                udid: deviceMatch[identifierIdx],
                version: osVersion,
                platform: getPlatformFromOsVersion(osVersion.split(' ')[0]),
                state: deviceMatch[deviceStateIdx],
                type: 'simulator',
            });
        }
    });
    return devices;
}
function getPlatformFromOsVersion(osVersion) {
    switch (osVersion) {
        case 'iOS':
            return 'ios';
        case 'tvOS':
            return 'tvos';
        case 'macOS':
            return 'macos';
        case 'xrOS':
        case 'visionOS':
            return 'visionos';
        default:
            return undefined;
    }
}
//# sourceMappingURL=listDevices.js.map