import type { ApplePlatform, DeviceType } from '../types/index.js';
export type DestinationInfo = {
    device: string;
    simulator: string;
};
export declare const genericDestinations: {
    readonly ios: {
        readonly device: "generic/platform=iOS";
        readonly simulator: "generic/platform=iOS Simulator";
    };
    readonly macos: {
        readonly device: "generic/platform=macOS";
        readonly simulator: "generic/platform=macOS";
    };
    readonly visionos: {
        readonly device: "generic/platform=visionOS";
        readonly simulator: "generic/platform=visionOS Simulator";
    };
    readonly tvos: {
        readonly device: "generic/platform=tvOS";
        readonly simulator: "generic/platform=tvOS Simulator";
    };
};
export declare function getGenericDestination(platform: ApplePlatform, deviceType: DeviceType): string;
