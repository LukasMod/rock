import type { IOSProjectParams } from '@react-native-community/cli-types';
import type { ApplePlatform, ProjectConfig } from '../types/index.js';
/**
 * Get the valid project config with non-null `xcodeProject` for the given Apple platform.
 * To be used before running commands or after installing pods.
 */
export declare function getValidProjectConfig(platformName: ApplePlatform, projectRoot: string, userConfig?: IOSProjectParams): ProjectConfig;
