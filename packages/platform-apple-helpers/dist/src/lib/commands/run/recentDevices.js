import { cacheManager, logger } from '@rock-js/tools';
export function cacheRecentDevice(device, platform) {
    const cacheKey = 'recentDevicesUDID-' + platform;
    try {
        const recentDevices = getRecentDevices(platform);
        const newRecentDevices = [device.udid, ...recentDevices];
        const uniqueDevices = Array.from(new Set(newRecentDevices)).slice(0, 5);
        cacheManager.set(cacheKey, JSON.stringify(uniqueDevices));
    }
    catch (error) {
        logger.debug(`Failed to cache recent device ${device.name} with UDID ${device.udid}. ${error}`);
    }
}
function getRecentDevices(platform) {
    const cacheKey = 'recentDevicesUDID-' + platform;
    const recentDevicesString = cacheManager.get(cacheKey);
    try {
        return recentDevicesString ? JSON.parse(recentDevicesString) : [];
    }
    catch (error) {
        logger.debug(`Failed to read recent devices from cache. ${error}`);
        return [];
    }
}
export function sortByRecentDevices(devices, platform) {
    const recentDevices = getRecentDevices(platform);
    const udids = Array.from(new Set([...recentDevices, ...devices.map(({ udid }) => udid)]));
    return udids
        .map((udid) => devices.find((device) => device.udid === udid))
        .filter(Boolean);
}
//# sourceMappingURL=recentDevices.js.map