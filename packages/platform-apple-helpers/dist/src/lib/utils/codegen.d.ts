import type { ApplePlatform } from '../types/index.js';
interface CodegenOptions {
    projectRoot: string;
    platformName: ApplePlatform;
    reactNativePath: string;
    sourceDir: string;
}
declare function runCodegen(options: CodegenOptions): Promise<void>;
export default runCodegen;
