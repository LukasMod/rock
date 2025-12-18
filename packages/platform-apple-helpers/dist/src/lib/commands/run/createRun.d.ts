import type { StartDevServerArgs } from '@rock-js/config';
import type { FingerprintSources, RemoteBuildCache } from '@rock-js/tools';
import type { ApplePlatform, ProjectConfig } from '../../types/index.js';
import type { RunFlags } from './runOptions.js';
export declare const createRun: ({ platformName, projectConfig, args, projectRoot, remoteCacheProvider, fingerprintOptions, reactNativePath, reactNativeVersion, platforms, startDevServer, usePrebuiltRNCore }: {
    platformName: ApplePlatform;
    projectConfig: ProjectConfig;
    args: RunFlags;
    projectRoot: string;
    remoteCacheProvider: null | (() => RemoteBuildCache) | undefined;
    fingerprintOptions: FingerprintSources;
    reactNativePath: string;
    reactNativeVersion: string;
    platforms: {
        [platform: string]: object;
    };
    startDevServer: (options: StartDevServerArgs) => void;
    usePrebuiltRNCore?: number;
}) => Promise<void>;
