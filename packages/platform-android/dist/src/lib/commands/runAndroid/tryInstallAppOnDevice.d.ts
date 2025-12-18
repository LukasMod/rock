import type { DeviceData } from './listAndroidDevices.js';
import type { AndroidProject, Flags } from './runAndroid.js';
export declare function tryInstallAppOnDevice(device: DeviceData, androidProject: AndroidProject, args: Flags, tasks: string[], binaryPath: string | undefined): Promise<void>;
