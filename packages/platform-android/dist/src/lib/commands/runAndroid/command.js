import { intro, outro } from '@rock-js/tools';
import { getValidProjectConfig } from '../getValidProjectConfig.js';
import { runAndroid, runOptions } from './runAndroid.js';
export function registerRunCommand(api, pluginConfig) {
    api.registerCommand({
        name: 'run:android',
        description: 'Builds your app and starts it on a connected Android emulator or a device.',
        action: async (args) => {
            intro('Running Android app');
            const projectRoot = api.getProjectRoot();
            const androidConfig = getValidProjectConfig(projectRoot, pluginConfig);
            await runAndroid(androidConfig, args, projectRoot, await api.getRemoteCacheProvider(), api.getFingerprintOptions(), api.getBundlerStart(), api.getReactNativeVersion(), api.getReactNativePath(), api.getPlatforms());
            outro('Success 🎉.');
        },
        options: runOptions,
    });
}
//# sourceMappingURL=command.js.map