export type DeviceData = {
    deviceId: string | undefined;
    readableName: string;
    connected: boolean;
    type: 'emulator' | 'phone';
};
export declare function listAndroidDevices(): Promise<DeviceData[]>;
