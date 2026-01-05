import type { DeviceData } from './listAndroidDevices.js';
import type { AndroidProject, Flags } from './runAndroid.js';
export declare function tryLaunchAppOnDevice(device: DeviceData, androidProject: AndroidProject, args: Flags): Promise<{
    applicationIdWithSuffix?: undefined;
} | {
    applicationIdWithSuffix: string;
}>;
