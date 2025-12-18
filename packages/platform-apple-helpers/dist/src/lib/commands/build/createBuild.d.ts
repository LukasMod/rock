import type { FingerprintSources, RemoteBuildCache } from '@rock-js/tools';
import type { BuilderCommand, ProjectConfig } from '../../types/index.js';
import type { BuildFlags } from './buildOptions.js';
export declare const createBuild: ({ platformName, projectConfig, args, projectRoot, reactNativePath, fingerprintOptions, brownfield, remoteCacheProvider, }: {
    platformName: BuilderCommand["platformName"];
    projectConfig: ProjectConfig;
    args: BuildFlags;
    projectRoot: string;
    reactNativePath: string;
    fingerprintOptions: FingerprintSources;
    brownfield?: boolean;
    remoteCacheProvider: null | (() => RemoteBuildCache) | undefined;
}) => Promise<{
    scheme: string | undefined;
}>;
