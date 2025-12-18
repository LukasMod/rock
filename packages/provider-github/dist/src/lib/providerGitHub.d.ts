import type { RemoteArtifact, RemoteBuildCache } from '@rock-js/tools';
import { type GitHubRepoDetails } from './config.js';
export declare class GitHubBuildCache implements RemoteBuildCache {
    name: string;
    repoDetails: GitHubRepoDetails | null;
    constructor(config?: {
        owner: string;
        repository: string;
        token: string;
    });
    getRepoDetails(): Promise<GitHubRepoDetails>;
    list({ artifactName, limit, }: {
        artifactName?: string;
        limit?: number;
    }): Promise<RemoteArtifact[]>;
    download({ artifactName, }: {
        artifactName: string;
    }): Promise<Response>;
    delete({ artifactName, limit, skipLatest, }: {
        artifactName: string;
        limit?: number;
        skipLatest?: boolean;
    }): Promise<RemoteArtifact[]>;
    upload(): Promise<RemoteArtifact & {
        getResponse: (buffer: Buffer | ((baseUrl: string) => Buffer), contentType?: string | undefined) => Response;
    }>;
}
export declare const providerGitHub: (options?: {
    owner: string;
    repository: string;
    token: string;
}) => () => RemoteBuildCache;
