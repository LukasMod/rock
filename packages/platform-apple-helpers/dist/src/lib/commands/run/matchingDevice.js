export function matchingDevice(devices, deviceArg) {
    const deviceByName = devices.find((device) => device.name === deviceArg || formattedDeviceName(device) === deviceArg);
    const deviceByUdid = devices.find((d) => d.udid === deviceArg);
    return deviceByName || deviceByUdid;
}
export function formattedDeviceName(simulator) {
    return simulator.version
        ? `${simulator.name} (${simulator.version})`
        : simulator.name;
}
//# sourceMappingURL=matchingDevice.js.map