export declare function getHdcPath(): string;
/**
 * Executes the commands needed to get a list of devices from ADB
 */
export declare function getDevices(): Promise<{
    name: string;
    method: string;
    state: string;
    locate: string;
    connectTool: string;
}[]>;
