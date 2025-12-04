import { deleteGitHubArtifacts, fetchGitHubArtifactsByName, } from './artifacts.js';
import { detectGitHubRepoDetails } from './config.js';
export class GitHubBuildCache {
    name = 'GitHub';
    repoDetails = null;
    constructor(config) {
        if (config) {
            const token = config.token || process.env['GITHUB_TOKEN'];
            if (!token) {
                throw new Error('GitHub Personal Access Token is required to fetch remote cache. Configure `GITHUB_TOKEN` variable in .env file or pass it as a `token` argument.');
            }
            this.repoDetails = {
                owner: config.owner,
                repository: config.repository,
                token,
            };
        }
    }
    async getRepoDetails() {
        if (!this.repoDetails) {
            this.repoDetails = await detectGitHubRepoDetails();
        }
        return this.repoDetails;
    }
    async list({ artifactName, limit, }) {
        const repoDetails = await this.getRepoDetails();
        const artifacts = await fetchGitHubArtifactsByName(artifactName, repoDetails, limit);
        return artifacts.map((artifact) => ({
            name: artifact.name,
            url: artifact.downloadUrl,
            id: String(artifact.id),
        }));
    }
    async download({ artifactName, }) {
        const repoDetails = await this.getRepoDetails();
        const artifacts = await this.list({ artifactName });
        if (artifacts.length === 0) {
            throw new Error(`No artifact found with name "${artifactName}"`);
        }
        return fetch(artifacts[0].url, {
            headers: {
                Authorization: `token ${repoDetails.token}`,
                'Accept-Encoding': 'None',
            },
        });
    }
    async delete({ artifactName, limit, skipLatest, }) {
        const repoDetails = await this.getRepoDetails();
        const artifacts = await fetchGitHubArtifactsByName(artifactName, repoDetails, limit);
        if (artifacts.length === 0) {
            throw new Error(`No artifact found with name "${artifactName}"`);
        }
        const [, ...rest] = artifacts;
        return await deleteGitHubArtifacts(skipLatest ? rest : artifacts, repoDetails, artifactName);
    }
    async upload() {
        throw new Error('Uploading artifacts to GitHub is not supported through GitHub API. See: https://docs.github.com/en/rest/actions/artifacts?apiVersion=2022-11-28');
    }
}
export const providerGitHub = (options) => () => new GitHubBuildCache(options);
//# sourceMappingURL=providerGitHub.js.map