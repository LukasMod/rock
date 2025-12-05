import { registerBuildCommand } from './commands/buildAndroid/command.js';
import { registerCreateKeystoreCommand } from './commands/generateKeystore.js';
import { getValidProjectConfig } from './commands/getValidProjectConfig.js';
import { registerRunCommand } from './commands/runAndroid/command.js';
import { registerSignCommand } from './commands/signAndroid/command.js';
export const platformAndroid = (pluginConfig) => (api) => {
    registerBuildCommand(api, pluginConfig);
    registerRunCommand(api, pluginConfig);
    registerCreateKeystoreCommand(api, pluginConfig);
    registerSignCommand(api);
    return {
        name: '@rock-js/platform-android',
        description: 'Rock plugin for everything Android.',
        autolinkingConfig: {
            get project() {
                const androidConfig = getValidProjectConfig(api.getProjectRoot(), pluginConfig);
                return { ...androidConfig };
            },
        },
    };
};
export default platformAndroid;
//# sourceMappingURL=platformAndroid.js.map