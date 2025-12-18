/**
 * Temporary paths for sign operation.
 * @param platformName - Platform name.
 */
export declare function getTempPaths(platformName: string): {
    /** Root path for sign operation. */
    root: string;
    /** Path to extracted IPA contents. */
    content: string;
    /** Path to the temporary provisioning plist. */
    provisioningPlist: string;
    /** Path to the temporary entitlements plist. */
    entitlementsPlist: string;
};
/**
 * Paths inside .app directory in extracted IPA file.
 * @param appPath - Path to the .app directory.
 */
export declare function getAppPaths(appPath: string): {
    /** Path to assets directory. */
    assetsDest: string;
    /** Path to the JS bundle. */
    jsBundle: string;
    /** Path to embedded provisioning profile. */
    provisioningProfile: string;
};
/**
 * Unpack IPA file contents to given path.
 * @param ipaPath - Path to the IPA file.
 * @param destination - Path to the destination folder.
 * @returns Path to .app directory (package) inside the IPA file.
 */
export declare const unpackIpa: (ipaPath: string, destination: string) => string;
/**
 * Pack IPA file from content path.
 * @param contentPath - Path to pack as IPA contents.
 * @param ipaPath - Path to the output IPA file.
 * @returns Path to the output IPA file.
 */
export declare const packIpa: (contentPath: string, ipaPath: string) => string;
