import type { supportedPlatforms } from '../utils/supportedPlatforms.js';
type ObjectValues<T> = T[keyof T];
export type ApplePlatform = ObjectValues<typeof supportedPlatforms>;
export interface Device {
    name: string;
    udid: string;
    version: string;
    platform: ApplePlatform | undefined;
    type: DeviceType;
    state: 'Booted' | 'Shutdown';
}
export type DeviceType = 'simulator' | 'device';
export interface Info {
    name: string;
    schemes?: string[];
    configurations?: string[];
    targets?: string[];
}
export interface BuilderCommand {
    platformName: ApplePlatform;
}
export interface XcodeProjectInfo {
    name: string;
    path: string;
    isWorkspace: boolean;
}
export interface Params {
    sourceDir?: string;
    assets?: string[];
}
export interface ProjectConfig {
    sourceDir: string;
    xcodeProject: XcodeProjectInfo;
}
export {};
