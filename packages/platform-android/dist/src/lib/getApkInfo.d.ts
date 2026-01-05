export interface ApkInfo {
    packageName: string;
    version: string;
}
/**
 * Extracts package information from an APK file using app-info-parser.
 * Similar to getInfoPlist for iOS, but for Android APK files.
 *
 * @param apkPath - Path to the APK file
 * @returns Object containing packageName and version
 */
export declare function getApkInfo(apkPath: string): Promise<ApkInfo>;
