import type { Info, XcodeProjectInfo } from '../types/index.js';
export declare function getInfo(projectInfo: XcodeProjectInfo, sourceDir: string): Promise<Info | undefined>;
