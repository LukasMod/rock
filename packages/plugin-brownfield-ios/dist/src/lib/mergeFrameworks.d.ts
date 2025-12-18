/**
 * Xcode emits different `.framework` file based on the destination (simulator arm64/x86_64, iphone arm64 etc.)
 * This takes those `.frameworks` files and merges them to a single `.xcframework` file for easier distribution.
 */
export declare function mergeFrameworks({ frameworkPaths, outputPath, sourceDir, }: {
    frameworkPaths: string[];
    outputPath: string;
    sourceDir: string;
}): Promise<void>;
