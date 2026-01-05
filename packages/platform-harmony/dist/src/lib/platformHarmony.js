import { registerBuildCommand } from './commands/build/command.js';
import { getValidProjectConfig, } from './commands/getValidProjectConfig.js';
import { registerRunCommand } from './commands/run/command.js';
export const platformHarmony = (pluginConfig) => (api) => {
    registerBuildCommand(api, pluginConfig);
    registerRunCommand(api, pluginConfig);
    return {
        name: '@rock-js/platform-harmony',
        description: 'Rock plugin for HarmonyOS Next.',
        autolinkingConfig: {
            get project() {
                const harmonyConfig = getValidProjectConfig(api.getProjectRoot(), pluginConfig);
                return harmonyConfig;
            },
        },
    };
};
export default platformHarmony;
//# sourceMappingURL=platformHarmony.js.map