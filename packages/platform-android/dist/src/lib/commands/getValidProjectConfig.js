import { projectConfig } from '@react-native-community/cli-config-android';
import { RockError } from '@rock-js/tools';
export function getValidProjectConfig(projectRoot, pluginConfig) {
    const androidConfig = projectConfig(projectRoot, pluginConfig);
    if (!androidConfig) {
        throw new RockError('Android project not found.');
    }
    return androidConfig;
}
//# sourceMappingURL=getValidProjectConfig.js.map