import type { Device } from '../../types/index.js';
export declare function launchSimulator(device: Device): Promise<undefined>;
export declare function runOnSimulator(device: Device, binaryPath: string, infoPlistPath: string): Promise<void>;
export default function installAppOnSimulator(udid: string, binaryPath: string): Promise<void>;
export declare function launchAppOnSimulator(udid: string, binaryPath: string, infoPlistPath: string): Promise<void>;
