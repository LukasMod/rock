import { type FingerprintSources } from '../fingerprint/index.js';
import type { RemoteBuildCache } from './common.js';
export declare function getBinaryPath({ artifactName, binaryPathFlag, localFlag, remoteCacheProvider, fingerprintOptions, sourceDir, platformName, }: {
    artifactName: string;
    binaryPathFlag?: string;
    localFlag?: boolean;
    remoteCacheProvider: null | (() => RemoteBuildCache) | undefined;
    fingerprintOptions: FingerprintSources;
    sourceDir: string;
    platformName: string;
}): Promise<string | undefined>;
