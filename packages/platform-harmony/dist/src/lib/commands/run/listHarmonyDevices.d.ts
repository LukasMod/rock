export type DeviceData = {
    deviceId: string | undefined;
    readableName: string | undefined;
    connected: boolean;
    type: 'emulator' | 'phone';
};
export declare function listHarmonyDevices(): Promise<DeviceData[]>;
