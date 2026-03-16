import type { ApplePlatform, Device } from '../../types/index.js';
export declare function cacheRecentDevice(device: Device, platform: ApplePlatform): void;
export declare function sortByRecentDevices(devices: Device[], platform: ApplePlatform): Device[];
