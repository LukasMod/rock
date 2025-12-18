import { type FingerprintResult } from 'fs-fingerprint';
export type { FingerprintInputHash } from 'fs-fingerprint';
export type FingerprintSources = {
    extraSources: string[];
    ignorePaths: string[];
    env: string[];
};
export type FingerprintOptions = {
    platform: 'ios' | 'android' | 'harmony';
    extraSources: string[];
    ignorePaths: string[];
    env: string[];
};
/**
 * Calculates the fingerprint of the native parts project of the project.
 */
export declare function nativeFingerprint(projectRoot: string, options: FingerprintOptions): Promise<FingerprintResult>;
