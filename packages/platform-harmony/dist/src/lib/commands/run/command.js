import { getValidProjectConfig, } from '../getValidProjectConfig.js';
import { runHarmony, runOptions } from './runHarmony.js';
export function registerRunCommand(api, pluginConfig) {
    api.registerCommand({
        name: 'run:harmony',
        description: 'Builds your app and starts it on a connected HarmonyOS Next device.',
        action: async (args) => {
            const projectRoot = api.getProjectRoot();
            const harmonyConfig = getValidProjectConfig(projectRoot, pluginConfig);
            await runHarmony(harmonyConfig, args, projectRoot, await api.getRemoteCacheProvider(), api.getFingerprintOptions());
        },
        options: runOptions,
    });
}
//# sourceMappingURL=command.js.map