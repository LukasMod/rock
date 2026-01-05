import type { AndroidProjectConfig } from '@react-native-community/cli-types';
import type { PlatformOutput, PluginApi } from '@rock-js/config';
type PluginConfig = AndroidProjectConfig;
export declare const platformAndroid: (pluginConfig?: Partial<PluginConfig>) => (api: PluginApi) => PlatformOutput;
export default platformAndroid;
