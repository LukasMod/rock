import { cacheManager, color, colorLink, logger, RockError, } from '@rock-js/tools';
const PAGE_SIZE = 100; // Maximum allowed by GitHub API
export async function fetchGitHubArtifactsByName(name, repoDetails, limit) {
    let page = 1;
    const result = [];
    const owner = repoDetails.owner;
    const repo = repoDetails.repository;
    try {
        while (true) {
            const url = `https://api.github.com/repos/${owner}/${repo}/actions/artifacts?per_page=${limit ?? PAGE_SIZE}&page=${page}${name ? `&name=${name}` : ''}`;
            let data;
            try {
                const response = await fetch(url, {
                    headers: { Authorization: `token ${repoDetails.token}` },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
                }
                data = await response.json();
            }
            catch (error) {
                throw new Error(`Error fetching artifacts from ${colorLink(url)}: ${error}`);
            }
            const artifacts = data.artifacts
                .filter((artifact) => !artifact.expired && artifact.workflow_run?.id)
                .map((artifact) => ({
                id: artifact.id,
                name: artifact.name,
                sizeInBytes: artifact.size_in_bytes,
                expiresAt: artifact.expires_at,
                downloadUrl: artifact.archive_download_url,
            }));
            result.push(...artifacts);
            if (artifacts.length < PAGE_SIZE) {
                break;
            }
            page += 1;
        }
    }
    catch (error) {
        if (error.message.includes('401 Unauthorized')) {
            cacheManager.remove('githubToken');
            throw new RockError(`Failed to fetch GitHub artifacts due to invalid or expired GitHub Personal Access Token provided.
Update the token under "${color.bold('remoteCacheProvider')}" key in ${colorLink('rock.config.mjs')} config file.

📘 Read more about generating a new token: ${colorLink('https://rockjs.dev/docs/github-actions/configuration#generate-github-personal-access-token-for-downloading-cached-builds')}`);
        }
        if (error.message.includes('404 Not Found')) {
            throw new RockError(`Failed to fetch GitHub artifacts due to "404 Not Found" error. This can happen for the following reasons:
- permission mismatch between your GitHub Personal Access Token and the repository
- you're blocked by the owner of the repository
- repository address is incorrect

Make sure the repository information and token under "${color.bold('remoteCacheProvider')}" key in ${colorLink('rock.config.mjs')} config file is valid.

📘 Read more about generating a new token: ${colorLink('https://rockjs.dev/docs/github-actions/configuration#generate-github-personal-access-token-for-downloading-cached-builds')}`);
        }
        throw new RockError(`Failed to fetch GitHub artifacts`, { cause: error });
    }
    result.sort((a, b) => {
        const expiresA = a.expiresAt ?? '0000-00-00';
        const expiresB = b.expiresAt ?? '0000-00-00';
        // Sort in descending order
        return expiresB.localeCompare(expiresA);
    });
    return result;
}
export async function deleteGitHubArtifacts(artifacts, repoDetails, artifactName) {
    const deletedArtifacts = [];
    try {
        const owner = repoDetails.owner;
        const repo = repoDetails.repository;
        // Delete all matching artifacts
        for (const artifact of artifacts) {
            const artifactId = artifact.id;
            const url = `https://api.github.com/repos/${owner}/${repo}/actions/artifacts/${artifactId}`;
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${repoDetails.token}`,
                    Accept: 'application/vnd.github+json',
                },
            });
            if (!response.ok) {
                logger.warn(`Failed to delete artifact ID ${artifactId}: ${response.status} ${response.statusText}`);
                continue;
            }
            deletedArtifacts.push({ name: artifact.name, url: artifact.downloadUrl });
        }
        return deletedArtifacts;
    }
    catch (error) {
        throw new RockError(`Failed to delete artifacts named "${artifactName}"`, {
            cause: error,
        });
    }
}
//# sourceMappingURL=artifacts.js.map