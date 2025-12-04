import type { AndroidProjectConfig, Config } from '@react-native-community/cli-types';
import type { StartDevServerArgs } from '@rock-js/config';
import type { FingerprintSources, RemoteBuildCache } from '@rock-js/tools';
import type { BuildFlags } from '../buildAndroid/buildAndroid.js';
export interface Flags extends BuildFlags {
    appId: string;
    appIdSuffix: string;
    mainActivity?: string;
    port: string;
    device?: string;
    binaryPath?: string;
    user?: string;
    local?: boolean;
    devServer?: boolean;
    clientLogs?: boolean;
}
export type AndroidProject = NonNullable<Config['project']['android']>;
/**
 * Starts the app on a connected Android emulator or device.
 */
export declare function runAndroid(androidProject: AndroidProjectConfig, args: Flags, projectRoot: string, remoteCacheProvider: null | (() => RemoteBuildCache) | undefined, fingerprintOptions: FingerprintSources, startDevServer: (options: StartDevServerArgs) => void, reactNativeVersion: string, reactNativePath: string, platforms: {
    [platform: string]: object;
}): Promise<void>;
export declare const runOptions: ({
    name: string;
    description: string;
    parse?: undefined;
} | {
    name: string;
    description: string;
    parse: (val: string) => string[];
} | {
    name: string;
    description: string;
    default: string;
})[];
