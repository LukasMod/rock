import { createBuild, createRun, getBuildOptions, getRunOptions, getValidProjectConfig, } from '@rock-js/platform-apple-helpers';
import { intro, outro } from '@rock-js/tools';
import { registerSignCommand } from './commands/signIos.js';
const buildOptions = getBuildOptions({ platformName: 'ios' });
const runOptions = getRunOptions({ platformName: 'ios' });
export const platformIOS = (pluginConfig) => (api) => {
    api.registerCommand({
        name: 'build:ios',
        description: 'Build iOS app.',
        action: async (args) => {
            intro('Building iOS app');
            const projectRoot = api.getProjectRoot();
            const iosConfig = getValidProjectConfig('ios', projectRoot, pluginConfig);
            await createBuild({
                platformName: 'ios',
                projectConfig: iosConfig,
                args: args,
                projectRoot,
                reactNativePath: api.getReactNativePath(),
                fingerprintOptions: api.getFingerprintOptions(),
                remoteCacheProvider: await api.getRemoteCacheProvider(),
                usePrebuiltRNCore: api.getUsePrebuiltRNCore(),
            });
            outro('Success 🎉.');
        },
        options: buildOptions,
    });
    api.registerCommand({
        name: 'run:ios',
        description: 'Run iOS app.',
        action: async (args) => {
            intro('Running iOS app');
            const projectRoot = api.getProjectRoot();
            const iosConfig = getValidProjectConfig('ios', projectRoot, pluginConfig);
            await createRun({
                platformName: 'ios',
                projectConfig: iosConfig,
                args: args,
                projectRoot,
                remoteCacheProvider: await api.getRemoteCacheProvider(),
                fingerprintOptions: api.getFingerprintOptions(),
                reactNativePath: api.getReactNativePath(),
                reactNativeVersion: api.getReactNativeVersion(),
                platforms: api.getPlatforms(),
                startDevServer: api.getBundlerStart(),
                usePrebuiltRNCore: api.getUsePrebuiltRNCore(),
            });
            outro('Success 🎉.');
        },
        // @ts-expect-error: fix `simulator` is not defined in `RunFlags`
        options: runOptions,
    });
    registerSignCommand(api);
    return {
        name: '@rock-js/platform-ios',
        description: 'Rock plugin for everything iOS.',
        autolinkingConfig: {
            get project() {
                const iosConfig = getValidProjectConfig('ios', api.getProjectRoot(), pluginConfig);
                return { ...iosConfig };
            },
        },
    };
};
export default platformIOS;
//# sourceMappingURL=platformIOS.js.map