import type { IOSProjectConfig } from '@react-native-community/cli-types';
import type { PlatformOutput, PluginApi } from '@rock-js/config';
export declare const platformIOS: (pluginConfig?: Partial<IOSProjectConfig>) => (api: PluginApi) => PlatformOutput;
export default platformIOS;
