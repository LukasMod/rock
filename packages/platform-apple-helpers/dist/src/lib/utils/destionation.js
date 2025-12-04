export const genericDestinations = {
    ios: {
        device: 'generic/platform=iOS',
        simulator: 'generic/platform=iOS Simulator',
    },
    macos: {
        device: 'generic/platform=macOS',
        simulator: 'generic/platform=macOS',
    },
    visionos: {
        device: 'generic/platform=visionOS',
        simulator: 'generic/platform=visionOS Simulator',
    },
    tvos: {
        device: 'generic/platform=tvOS',
        simulator: 'generic/platform=tvOS Simulator',
    },
};
export function getGenericDestination(platform, deviceType) {
    return genericDestinations[platform][deviceType];
}
//# sourceMappingURL=destionation.js.map