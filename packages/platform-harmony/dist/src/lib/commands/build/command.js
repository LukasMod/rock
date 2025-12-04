import { getValidProjectConfig, } from '../getValidProjectConfig.js';
import { buildHarmony, options } from './buildHarmony.js';
export function registerBuildCommand(api, pluginConfig) {
    api.registerCommand({
        name: 'build:harmony',
        description: 'Builds your app for HarmonyOS Next platform.',
        action: async (args) => {
            const projectRoot = api.getProjectRoot();
            const harmonyConfig = getValidProjectConfig(projectRoot, pluginConfig);
            await buildHarmony(harmonyConfig, args, projectRoot, await api.getRemoteCacheProvider(), api.getFingerprintOptions());
        },
        options: options,
    });
}
//# sourceMappingURL=command.js.map