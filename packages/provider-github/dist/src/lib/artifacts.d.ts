import { type RemoteArtifact } from '@rock-js/tools';
import { type GitHubRepoDetails } from './config.js';
type GitHubArtifact = {
    id: number;
    name: string;
    expiresAt: string | null;
    sizeInBytes: number;
    downloadUrl: string;
};
export declare function fetchGitHubArtifactsByName(name: string | undefined, repoDetails: GitHubRepoDetails, limit?: number): Promise<GitHubArtifact[] | []>;
export declare function deleteGitHubArtifacts(artifacts: GitHubArtifact[], repoDetails: GitHubRepoDetails, artifactName: string): Promise<RemoteArtifact[]>;
export {};
