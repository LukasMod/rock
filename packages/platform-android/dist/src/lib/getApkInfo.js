import path from 'node:path';
// @ts-expect-error - app-info-parser doesn't have types
import AppInfoParser from 'app-info-parser';
/**
 * Extracts package information from an APK file using app-info-parser.
 * Similar to getInfoPlist for iOS, but for Android APK files.
 *
 * @param apkPath - Path to the APK file
 * @returns Object containing packageName and version
 */
export async function getApkInfo(apkPath) {
    try {
        const parser = new AppInfoParser(apkPath);
        const appInfo = await parser.parse();
        return {
            packageName: appInfo.package || 'unknown',
            version: appInfo.versionName || appInfo.versionCode?.toString() || '1.0',
        };
    }
    catch {
        // Fallback to filename if parsing fails
        const apkFileName = path.basename(apkPath, '.apk');
        return {
            packageName: apkFileName,
            version: '1.0',
        };
    }
}
//# sourceMappingURL=getApkInfo.js.map