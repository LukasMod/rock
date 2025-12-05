import { type RemoteBuildCache } from './common.js';
import type { LocalBuild } from './localBuildCache.js';
type FetchCachedBuildOptions = {
    artifactName: string;
    remoteCacheProvider: undefined | null | {
        (): RemoteBuildCache;
    };
};
export declare function fetchCachedBuild({ artifactName, remoteCacheProvider, }: FetchCachedBuildOptions): Promise<LocalBuild | undefined>;
export declare function handleDownloadResponse(response: Response, localArtifactPath: string, onProgress: (progress: string, totalMB: string) => void): Promise<void>;
export declare function handleUploadResponse(getResponse: (buffer: Buffer) => Response, buffer: Buffer, onProgress: (progress: string, totalMB: string) => void): Promise<void>;
export {};
