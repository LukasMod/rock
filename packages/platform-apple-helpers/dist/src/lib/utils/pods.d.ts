import type { ApplePlatform } from '../types/index.js';
export declare function installPodsIfNeeded(projectRoot: string, platformName: ApplePlatform, sourceDir: string, newArch: boolean, reactNativePath: string, brownfield?: boolean, usePrebuiltRNCore?: number): Promise<boolean>;
