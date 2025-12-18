import { getProjectConfig } from '@react-native-community/cli-config-apple';
import { RockError } from '@rock-js/tools';
/**
 * Get the valid project config with non-null `xcodeProject` for the given Apple platform.
 * To be used before running commands or after installing pods.
 */
export function getValidProjectConfig(platformName, projectRoot, userConfig = {}) {
    const newProjectConfig = getProjectConfig({ platformName })(projectRoot, userConfig);
    if (!newProjectConfig || newProjectConfig.xcodeProject === null) {
        throw new RockError('Failed to get Xcode project information');
    }
    return {
        sourceDir: newProjectConfig.sourceDir,
        xcodeProject: newProjectConfig.xcodeProject,
    };
}
//# sourceMappingURL=getValidProjectConfig.js.map