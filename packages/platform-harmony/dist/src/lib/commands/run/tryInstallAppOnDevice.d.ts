import type { DeviceData } from './listHarmonyDevices.js';
import type { Flags } from './runHarmony.js';
export declare function tryInstallAppOnDevice(device: DeviceData, sourceDir: string, args: Flags, binaryPath: string | undefined): Promise<void>;
