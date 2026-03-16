import type { FingerprintSources } from '../fingerprint/index.js';
export declare const BUILD_CACHE_DIR = "remote-build";
export declare const supportedRemoteCacheProviders: readonly ["github-actions", "s3"];
export type SupportedRemoteCacheProviders = typeof supportedRemoteCacheProviders[number];
export type RemoteArtifact = {
    name: string;
    url: string;
    id?: string;
};
export type LocalArtifact = {
    name: string;
};
/**
 * Interface for implementing remote build cache providers.
 * Remote cache providers allow storing and retrieving native build artifacts (e.g. APK, IPA)
 * from remote storage like S3, GitHub Artifacts etc.
 */
export interface RemoteBuildCache {
    /** Unique identifier for this cache provider, will be displayed in logs */
    name: string;
    /**
     * List available artifacts matching the given name pattern
     * @param artifactName - Passed after fingerprinting the build, e.g. `rock-android-debug-1234567890` for android in debug variant
     * @param limit - Optional maximum number of artifacts to return
     * @returns Array of matching remote artifacts, or empty array if none found
     */
    list({ artifactName, limit, }: {
        artifactName: string | undefined;
        limit?: number;
    }): Promise<RemoteArtifact[]>;
    /**
     * Download a remote artifact to local storage
     * @param artifactName - Name of the artifact to download, e.g. `rock-android-debug-1234567890` for android in debug variant
     * @returns Response object from fetch, which will be used to download the artifact
     */
    download({ artifactName }: {
        artifactName: string;
    }): Promise<Response>;
    /**
     * Delete a remote artifact
     * @param artifactName - Name of the artifact to delete, e.g. `rock-android-debug-1234567890` for android in debug variant
     * @param limit - Optional maximum number of artifacts to delete
     * @param skipLatest - Optional flag to skip the latest artifact, helpful when deleting all but the latest artifact
     * @returns Array of deleted artifacts
     * @throws {Error} Throws if artifact is not found or deletion fails
     */
    delete({ artifactName, limit, skipLatest, }: {
        artifactName: string;
        limit?: number;
        skipLatest?: boolean;
    }): Promise<RemoteArtifact[]>;
    /**
     * Upload a local artifact stored in build cache to remote storage
     * @param artifactName - Name of the artifact to upload, e.g. `rock-android-debug-1234567890` for android in debug variant
     * @param uploadArtifactName - Name of the artifact to upload, e.g. `ad-hoc/rock-ios-device-Release-1234567890/YourApp.ipa` for ad-hoc distribution
     * @returns Remote artifact info with response function for upload control
     * @throws {Error} Throws if upload fails
     */
    upload({ artifactName, uploadArtifactName, }: {
        artifactName: string;
        uploadArtifactName?: string;
    }): Promise<RemoteArtifact & {
        getResponse: (buffer: Buffer | ((baseUrl: string) => Buffer), contentType?: string) => Response;
    }>;
}
/**
 * Used formats:
 * - rock-android-debug-1234567890
 * - rock-ios-simulator-debug-1234567890
 * - rock-ios-device-debug-1234567890
 */
export declare function formatArtifactName({ platform, traits, root, fingerprintOptions, raw, type, }: {
    platform?: 'ios' | 'android' | 'harmony';
    traits?: string[];
    root: string;
    fingerprintOptions: FingerprintSources;
    raw?: boolean;
    type?: 'create' | 'update';
}): Promise<string>;
export declare function getLocalArtifactPath(artifactName: string): string;
export declare function getLocalBinaryPath(artifactPath: string): string | null;
