import { getDevices } from './hdc.js';
export async function listHarmonyDevices() {
    const devices = await getDevices();
    const allDevices = [];
    for (const device of devices) {
        const phoneData = {
            deviceId: device.name,
            // @todo get readable name
            readableName: device.name,
            type: 'phone',
            connected: device.state === 'Connected',
        };
        allDevices.push(phoneData);
    }
    return allDevices;
}
//# sourceMappingURL=listHarmonyDevices.js.map