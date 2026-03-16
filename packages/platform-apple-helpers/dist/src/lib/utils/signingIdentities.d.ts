export type SigningIdentity = {
    hash: string;
    name: string;
};
/**
 * Input is in the form of:
 * ```
 *   1) 1234567890ABCDEF1234567890ABCDEF12345678 "Apple Development: John Doe (TEAMID1234)"
 *   2) ABCDEF1234567890ABCDEF1234567890ABCDEF12 "Apple Distribution: Jane Smith (TEAMID5678)"
 * ```
 * @param output
 * @returns
 */
export declare function parseSigningIdentities(output: string): SigningIdentity[];
export declare function getValidSigningIdentities(): Promise<SigningIdentity[]>;
export declare function promptSigningIdentity(currentIdentity?: string | null): Promise<string>;
