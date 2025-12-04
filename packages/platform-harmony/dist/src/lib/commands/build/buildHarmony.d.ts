import type { RemoteBuildCache } from '@rock-js/tools';
import { type FingerprintSources } from '@rock-js/tools';
export interface BuildFlags {
    buildMode: string;
    module: string;
    product: string;
    local?: boolean;
}
export declare function buildHarmony(harmonyConfig: {
    sourceDir: string;
    bundleName: string;
}, args: BuildFlags, projectRoot: string, remoteCacheProvider: null | (() => RemoteBuildCache) | undefined, fingerprintOptions: FingerprintSources): Promise<void>;
export declare const options: ({
    name: string;
    description: string;
    default?: undefined;
} | {
    name: string;
    description: string;
    default: string;
})[];
