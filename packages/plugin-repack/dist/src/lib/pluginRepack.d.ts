import type { BundlerPluginOutput, PluginApi, StartDevServerArgs } from '@rock-js/config';
type PluginConfig = {
    platforms?: {
        [key: string]: object;
    };
};
export declare function startDevServer({ root, args, reactNativeVersion: _reactNativeVersion, reactNativePath, platforms, }: StartDevServerArgs, pluginConfig?: PluginConfig): Promise<void>;
export declare const pluginRepack: (pluginConfig?: PluginConfig) => (api: PluginApi) => BundlerPluginOutput;
export default pluginRepack;
