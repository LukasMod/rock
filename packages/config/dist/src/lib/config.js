import * as fs from 'node:fs';
import { createRequire } from 'node:module';
import * as path from 'node:path';
import { pathToFileURL } from 'node:url';
import { colorLink, getReactNativeVersion, logger } from '@rock-js/tools';
import { ConfigTypeSchema } from './schema.js';
import { formatValidationError } from './utils.js';
const extensions = ['.js', '.ts', '.mjs'];
const importUp = async (dir, name) => {
    const filePath = path.join(dir, name);
    for (const ext of extensions) {
        const filePathWithExt = `${filePath}${ext}`;
        if (fs.existsSync(filePathWithExt)) {
            let config;
            if (ext === '.mjs') {
                config = await import(pathToFileURL(filePathWithExt).href).then((module) => module.default);
            }
            else {
                const require = createRequire(import.meta.url);
                config = require(filePathWithExt);
            }
            return { config, filePathWithExt, configDir: dir };
        }
    }
    const parentDir = path.dirname(dir);
    if (parentDir === dir) {
        throw new Error(`${name} not found in any parent directory of ${dir}`);
    }
    return importUp(parentDir, name);
};
export async function getConfig(dir, internalPlugins) {
    const { config, filePathWithExt, configDir } = await importUp(dir, 'rock.config');
    const { error, value: validatedConfig } = ConfigTypeSchema.validate(config);
    if (error) {
        logger.error(`Invalid ${colorLink(path.relative(configDir, filePathWithExt))} file:\n` + formatValidationError(config, error));
        process.exit(1);
    }
    const projectRoot = validatedConfig.root
        ? path.resolve(configDir, validatedConfig.root)
        : configDir;
    if (!fs.existsSync(projectRoot)) {
        logger.error(`Project root ${projectRoot} does not exist. Please check your config file.`);
        process.exit(1);
    }
    let bundler;
    const api = {
        registerCommand: (command) => {
            validatedConfig.commands = [...(validatedConfig.commands || []), command];
        },
        getProjectRoot: () => projectRoot,
        getReactNativeVersion: () => getReactNativeVersion(projectRoot),
        getReactNativePath: () => resolveReactNativePath(projectRoot),
        getPlatforms: () => validatedConfig.platforms,
        getRemoteCacheProvider: async () => {
            // special case for github-actions
            if (validatedConfig.remoteCacheProvider === 'github-actions') {
                logger.warnOnce('github-actions')(`Using shorthand "github-actions" as "remoteCacheProvider" value in ${colorLink('rock.config.mjs')} is deprecated. It will be removed in future releases. 
Please use "@rock-js/provider-github" plugin explicitly instead.
Read more: ${colorLink('https://rockjs.dev/docs/configuration#github-actions-provider')}`);
                const { providerGitHub } = await import('@rock-js/provider-github');
                return providerGitHub();
            }
            return validatedConfig.remoteCacheProvider;
        },
        getFingerprintOptions: () => validatedConfig.fingerprint,
        getBundlerStart: () => ({ args }) => {
            return bundler?.start({
                root: api.getProjectRoot(),
                args,
                reactNativeVersion: api.getReactNativeVersion(),
                reactNativePath: api.getReactNativePath(),
                platforms: api.getPlatforms(),
            });
        },
        getUsePrebuiltRNCore: () => validatedConfig.usePrebuiltRNCore,
    };
    const platforms = {};
    if (validatedConfig.platforms) {
        // platforms register commands and custom platform functionality (TBD)
        for (const platform in validatedConfig.platforms) {
            const platformOutput = validatedConfig.platforms[platform](api);
            platforms[platform] = platformOutput;
        }
    }
    if (validatedConfig.plugins) {
        // plugins register commands
        for (const plugin of validatedConfig.plugins) {
            assignOriginToCommand(plugin, api, validatedConfig);
        }
    }
    if (validatedConfig.bundler) {
        bundler = assignOriginToCommand(validatedConfig.bundler, api, validatedConfig);
    }
    for (const internalPlugin of internalPlugins) {
        assignOriginToCommand(internalPlugin({ root: projectRoot, platforms }), api, validatedConfig);
    }
    const outputConfig = {
        root: projectRoot,
        commands: validatedConfig.commands ?? [],
        platforms: platforms ?? {},
        bundler,
        ...api,
    };
    return outputConfig;
}
function resolveReactNativePath(root) {
    const require = createRequire(import.meta.url);
    return path.join(require.resolve('react-native', { paths: [root] }), '..');
}
/**
 *
 * Assigns __origin property to each command in the config for later use in error handling.
 */
function assignOriginToCommand(plugin, api, config) {
    const len = config.commands?.length ?? 0;
    const { name, ...rest } = plugin(api);
    const newlen = config.commands?.length ?? 0;
    for (let i = len; i < newlen; i++) {
        if (config.commands?.[i]) {
            config.commands[i].__origin = name;
        }
    }
    return { name, ...rest };
}
//# sourceMappingURL=config.js.map