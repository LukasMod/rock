import type { DeviceData } from './listHarmonyDevices.js';
import type { Flags } from './runHarmony.js';
export declare function tryLaunchAppOnDevice(device: DeviceData, bundleName: string, args: Flags): Promise<{
    applicationIdWithSuffix?: undefined;
} | {
    applicationIdWithSuffix: string;
}>;
