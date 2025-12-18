import type { IOSProjectConfig } from '@react-native-community/cli-types';
import { type FingerprintSources } from '@rock-js/tools';
import type { BuildFlags } from '../commands/build/buildOptions.js';
import type { RunFlags } from '../commands/run/runOptions.js';
import type { ApplePlatform, ProjectConfig } from '../types/index.js';
export declare function buildApp({ args, projectConfig, pluginConfig, platformName, udid, projectRoot, deviceName, reactNativePath, binaryPath, brownfield, artifactName, fingerprintOptions, deviceOrSimulator, usePrebuiltRNCore, }: {
    args: RunFlags | BuildFlags;
    projectConfig: ProjectConfig;
    pluginConfig?: IOSProjectConfig;
    platformName: ApplePlatform;
    udid?: string;
    deviceName?: string;
    projectRoot: string;
    reactNativePath: string;
    binaryPath?: string;
    brownfield?: boolean;
    artifactName: string;
    fingerprintOptions: FingerprintSources;
    deviceOrSimulator: string;
    usePrebuiltRNCore?: number;
}): Promise<{
    appPath: string;
    bundleIdentifier: any;
    infoPlistPath: string;
    scheme: string | undefined;
    xcodeProject: import("../types/index.js").XcodeProjectInfo;
    sourceDir: string;
}>;
