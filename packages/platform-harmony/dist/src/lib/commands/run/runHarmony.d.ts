import type { FingerprintSources, RemoteBuildCache } from '@rock-js/tools';
import type { BuildFlags } from '../build/buildHarmony.js';
export interface Flags extends BuildFlags {
    ability: string;
    port: string;
    device?: string;
    binaryPath?: string;
}
/**
 * Starts the app on a connected HarmonyOS emulator or device.
 */
export declare function runHarmony(harmonyConfig: {
    sourceDir: string;
    bundleName: string;
}, args: Flags, projectRoot: string, remoteCacheProvider: null | (() => RemoteBuildCache) | undefined, fingerprintOptions: FingerprintSources): Promise<void>;
export declare const runOptions: ({
    name: string;
    description: string;
    default?: undefined;
} | {
    name: string;
    description: string;
    default: string;
})[];
