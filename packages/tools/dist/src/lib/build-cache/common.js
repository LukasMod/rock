import fs from 'node:fs';
import path from 'node:path';
import { color } from '../color.js';
import { nativeFingerprint } from '../fingerprint/index.js';
import { isInteractive } from '../isInteractive.js';
import { getCacheRootPath } from '../project.js';
import { spinner } from '../prompts.js';
export const BUILD_CACHE_DIR = 'remote-build';
export const supportedRemoteCacheProviders = ['github-actions', 's3'];
/**
 * Used formats:
 * - rock-android-debug-1234567890
 * - rock-ios-simulator-debug-1234567890
 * - rock-ios-device-debug-1234567890
 */
export async function formatArtifactName({ platform, traits, root, fingerprintOptions, raw, type, }) {
    if (!platform || !traits) {
        return '';
    }
    if (raw || !isInteractive()) {
        const { hash } = await nativeFingerprint(root, {
            ...fingerprintOptions,
            platform,
        });
        return `rock-${platform}-${traits.join('-')}-${hash}`;
    }
    const startMessage = type === 'update' ? 'Updating' : 'Calculating';
    const stopMessage = type === 'update' ? 'Updated' : 'Calculated';
    const loader = spinner();
    loader.start(`${startMessage} project fingerprint`);
    const { hash } = await nativeFingerprint(root, {
        ...fingerprintOptions,
        platform,
    });
    loader.stop(`${stopMessage} project fingerprint: ${color.bold(color.magenta(hash))}`);
    return `rock-${platform}-${traits.join('-')}-${hash}`;
}
export function getLocalArtifactPath(artifactName) {
    return path.join(getCacheRootPath(), BUILD_CACHE_DIR, artifactName);
}
export function getLocalBinaryPath(artifactPath) {
    const files = fs.readdirSync(artifactPath);
    // Get the first non-hidden file as the binary
    const binaryName = files.find((file) => file && !file.startsWith('.'));
    return binaryName ? path.join(artifactPath, binaryName) : null;
}
//# sourceMappingURL=common.js.map