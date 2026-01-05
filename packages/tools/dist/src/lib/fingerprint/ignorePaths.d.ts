/**
 * Returns all ignore paths for the given platform, source directory and project root.
 * @param platform - The platform to get the ignore paths for.
 * @param sourceDir - The relative source directory of that platform to get the ignore paths for.
 * @param projectRoot - The project root to get the ignore paths for.
 * @returns All ignore paths for the given platform, source directory and project root.
 */
export declare function getAllIgnorePaths(platform: string, sourceDir: string, projectRoot: string): string[];
