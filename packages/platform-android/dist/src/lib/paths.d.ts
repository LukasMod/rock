export declare function getAndroidSdkPath(): string;
export declare function getAndroidBuildToolsPath(): string;
/**
 * Build tools are located in the <sdk-root>/build-tools/<version>/ directory.
 */
export declare function findAndroidBuildTool(toolName: string): string | null;
export declare function versionCompare(first: string, second: string): number;
