import type { ApplePlatform } from '../types/index.js';
interface PlatformInfo {
    readableName: string;
}
/**
 * Returns platform readable name.
 * Falls back to iOS if platform is not supported.
 */
export declare function getPlatformInfo(platform: ApplePlatform): PlatformInfo;
export {};
