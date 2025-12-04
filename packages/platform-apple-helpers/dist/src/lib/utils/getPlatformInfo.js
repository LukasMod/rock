/**
 * Returns platform readable name.
 * Falls back to iOS if platform is not supported.
 */
export function getPlatformInfo(platform) {
    switch (platform) {
        case 'tvos':
            return {
                readableName: 'tvOS',
            };
        case 'visionos':
            return {
                readableName: 'visionOS',
            };
        case 'macos':
            return {
                readableName: 'macOS',
            };
        case 'ios':
        default:
            return {
                readableName: 'iOS',
            };
    }
}
//# sourceMappingURL=getPlatformInfo.js.map