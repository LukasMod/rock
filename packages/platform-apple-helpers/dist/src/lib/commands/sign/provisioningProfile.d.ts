/**
 * Decodes provisioning profile to XML plist.
 * @param profilePath - Path to the provisioning profile.
 * @param outputPath - Path to the output plist file.
 */
export declare function decodeProvisioningProfileToPlist(profilePath: string, outputPath: string): Promise<void>;
export type GenerateEntitlementsFileOptions = {
    provisioningPlistPath: string;
    outputPath: string;
};
/**
 * Generates entitlements plist from provisioning profile plist.
 * @param provisioningPlistPath - Path to the provisioning profile plist.
 * @param outputPath - Path to the output entitlements plist file.
 */
export declare const generateEntitlementsPlist: ({ outputPath, provisioningPlistPath, }: GenerateEntitlementsFileOptions) => Promise<void>;
/**
 * Extract code sign identity from provisioning profile plist file.
 * @param plistPath - Path to the provisioning profile plist file.
 * @returns Code sign identity name.
 */
export declare function getIdentityFromProvisioningPlist(plistPath: string): Promise<string | null>;
/**
 * Extracts certificate name used from subject field. This names corresponds to
 * the name of the signing identity.
 */
export declare function extractCertificateName(subject: string): string | null;
