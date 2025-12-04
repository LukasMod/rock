import type { ApplePlatform, XcodeProjectInfo } from '../../types/index.js';
import type { RunFlags } from '../run/runOptions.js';
import type { BuildFlags } from './buildOptions.js';
export declare const buildProject: ({ xcodeProject, sourceDir, platformName, scheme, configuration, destinations, args, }: {
    xcodeProject: XcodeProjectInfo;
    sourceDir: string;
    platformName: ApplePlatform;
    scheme: string;
    configuration: string;
    destinations: string[];
    args: RunFlags | BuildFlags;
}) => Promise<void>;
