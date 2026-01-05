import type { ApplePlatform, XcodeProjectInfo } from '../../types/index.js';
export declare function getBuildSettings({ xcodeProject, sourceDir, platformName, configuration, destinations, scheme, target, buildFolder, }: {
    xcodeProject: XcodeProjectInfo;
    sourceDir: string;
    platformName: ApplePlatform;
    configuration: string;
    destinations: string[];
    scheme: string;
    target?: string;
    buildFolder?: string;
}): Promise<{
    appPath: string;
    infoPlistPath: string;
    bundleIdentifier: string;
}>;
