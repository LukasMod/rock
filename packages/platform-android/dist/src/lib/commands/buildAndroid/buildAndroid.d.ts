import type { AndroidProjectConfig } from '@react-native-community/cli-types';
import type { RemoteBuildCache } from '@rock-js/tools';
import { type FingerprintSources } from '@rock-js/tools';
export interface BuildFlags {
    variant: string;
    aab?: boolean;
    activeArchOnly?: boolean;
    tasks?: Array<string>;
    extraParams?: Array<string>;
    local?: boolean;
}
export declare function buildAndroid(androidProject: AndroidProjectConfig, args: BuildFlags, projectRoot: string, remoteCacheProvider: null | (() => RemoteBuildCache) | undefined, fingerprintOptions: FingerprintSources): Promise<void>;
export declare const options: ({
    name: string;
    description: string;
    parse?: undefined;
} | {
    name: string;
    description: string;
    parse: (val: string) => string[];
})[];
