import type { AndroidProjectConfig } from '@react-native-community/cli-types';
import type { PluginApi } from '@rock-js/config';
export declare function registerCreateKeystoreCommand(api: PluginApi, pluginConfig: Partial<AndroidProjectConfig> | undefined): void;
export declare function generateKeystore(androidProject: AndroidProjectConfig, args: Flags): Promise<void>;
type Flags = {
    name?: string;
    alias?: string;
};
export declare const generateKeystoreOptions: {
    name: string;
    description: string;
}[];
export {};
