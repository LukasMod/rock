import type { Device } from '../../types/index.js';
export declare function runOnDevice(selectedDevice: Device, binaryPath: string, sourceDir: string, bundleIdentifier: string): Promise<void>;
