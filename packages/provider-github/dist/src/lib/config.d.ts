export declare function getGitHubToken(): string | undefined;
export declare function promptForGitHubToken(): Promise<string>;
export type GitHubRepoDetails = {
    owner: string;
    repository: string;
    token: string;
};
export declare function detectGitHubRepoDetails(): Promise<GitHubRepoDetails>;
