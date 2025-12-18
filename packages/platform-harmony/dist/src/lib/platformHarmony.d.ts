import type { PlatformOutput, PluginApi } from '@rock-js/config';
import { type HarmonyProjectConfig } from './commands/getValidProjectConfig.js';
type PluginConfig = HarmonyProjectConfig;
export declare const platformHarmony: (pluginConfig?: Partial<PluginConfig>) => (api: PluginApi) => PlatformOutput;
export default platformHarmony;
