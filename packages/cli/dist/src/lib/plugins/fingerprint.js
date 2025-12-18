import { createHash } from 'node:crypto';
import { performance } from 'node:perf_hooks';
import { color, intro, isInteractive, logger, nativeFingerprint, outro, RockError, spinner, } from '@rock-js/tools';
const hashValue = (value) => `[HASHED:${createHash('sha256').update(value).digest('hex').substring(0, 8)}]`;
/**
 * Redacts sensitive environment variables from fingerprint sources by hashing their values
 */
function redactSensitiveSources(sources) {
    return sources.map((source) => {
        if (source.key === 'json:env' && 'json' in source) {
            const env = source.json;
            const redactedEnv = Object.fromEntries(Object.entries(env).map(([key, value]) => [key, hashValue(value)]));
            return { ...source, json: redactedEnv };
        }
        return source;
    });
}
export async function nativeFingerprintCommand(path, { extraSources, ignorePaths, env }, options) {
    validateOptions(options);
    const platform = options.platform;
    const readablePlatformName = platform === 'ios'
        ? 'iOS'
        : platform === 'android'
            ? 'Android'
            : 'HarmonyOS';
    if (options.raw || !isInteractive()) {
        const fingerprint = await nativeFingerprint(path, {
            platform,
            extraSources,
            ignorePaths,
            env,
        });
        console.log(fingerprint.hash);
        // log sources to stderr to avoid polluting the standard output
        console.error(JSON.stringify({
            hash: fingerprint.hash,
            sources: redactSensitiveSources(fingerprint.inputs.filter((source) => source.hash != null)),
        }, null, 2));
        return;
    }
    intro(`${readablePlatformName} Fingerprint`);
    const loader = spinner();
    loader.start("Calculating fingerprint for the project's native parts");
    const start = performance.now();
    const fingerprint = await nativeFingerprint(path, {
        platform,
        extraSources,
        ignorePaths,
        env,
    });
    const duration = performance.now() - start;
    loader.stop(`Fingerprint calculated: ${color.bold(color.magenta(fingerprint.hash))}`);
    logger.debug('Sources:', JSON.stringify(redactSensitiveSources(fingerprint.inputs.filter((source) => source.hash != null)), null, 2));
    logger.debug(`Duration: ${(duration / 1000).toFixed(1)}s`);
    outro('Success 🎉.');
}
function validateOptions(options) {
    if (!options.platform) {
        throw new RockError('The --platform flag is required. Please specify either "ios", "android" or "harmony".');
    }
    if (options.platform !== 'ios' &&
        options.platform !== 'android' &&
        options.platform !== 'harmony') {
        throw new RockError(`Unsupported platform "${options.platform}". Please specify either "ios", "android" or "harmony".`);
    }
}
export const fingerprintPlugin = () => (api) => {
    api.registerCommand({
        name: 'fingerprint',
        description: 'Calculate fingerprint for given platform',
        action: async (path, options) => {
            const fingerprintOptions = api.getFingerprintOptions();
            const dir = path || api.getProjectRoot();
            await nativeFingerprintCommand(dir, fingerprintOptions, options);
        },
        options: [
            {
                name: '-p, --platform <string>',
                description: 'Select platform, e.g. ios or android',
            },
            {
                name: '--raw',
                description: 'Output the raw fingerprint hash for piping',
            },
        ],
        args: [
            { name: '[path]', description: 'Directory to calculate fingerprint for' },
        ],
    });
    return {
        name: 'internal_fingerprint',
        description: 'Fingerprint plugin',
    };
};
//# sourceMappingURL=fingerprint.js.map