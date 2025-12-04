export declare function getAdbPath(): string;
/**
 * Executes the commands needed to get a list of devices from ADB
 */
export declare function getDevices(): Promise<string[]>;
