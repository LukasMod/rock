import type { PluginApi } from '@rock-js/config';
import type { FingerprintSources } from '@rock-js/tools';
type NativeFingerprintCommandOptions = {
    platform: 'ios' | 'android' | 'harmony';
    raw?: boolean;
};
export declare function nativeFingerprintCommand(path: string, { extraSources, ignorePaths, env }: FingerprintSources, options: NativeFingerprintCommandOptions): Promise<void>;
export declare const fingerprintPlugin: () => (api: PluginApi) => {
    name: string;
    description: string;
};
export {};
