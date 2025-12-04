export type LocalBuild = {
    name: string;
    artifactPath: string;
    binaryPath: string;
};
export declare function queryLocalBuildCache(artifactName: string): LocalBuild | null;
export declare function saveLocalBuildCache(artifactName: string, binaryPath: string): void;
export declare function getLocalBuildCacheBinaryPath(artifactName: string): string | undefined;
