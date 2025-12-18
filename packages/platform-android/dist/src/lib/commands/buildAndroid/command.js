import { getValidProjectConfig } from '../getValidProjectConfig.js';
import { buildAndroid, options } from './buildAndroid.js';
export function registerBuildCommand(api, pluginConfig) {
    api.registerCommand({
        name: 'build:android',
        description: 'Builds your app for Android platform.',
        action: async (args) => {
            const androidConfig = getValidProjectConfig(api.getProjectRoot(), pluginConfig);
            await buildAndroid(androidConfig, args, api.getProjectRoot(), await api.getRemoteCacheProvider(), api.getFingerprintOptions());
        },
        options: options,
    });
}
//# sourceMappingURL=command.js.map