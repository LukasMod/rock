export type SignAndroidOptions = {
    binaryPath: string;
    keystorePath?: string;
    keystorePassword?: string;
    keyAlias?: string;
    keyPassword?: string;
    outputPath?: string;
    buildJsBundle?: boolean;
    jsBundlePath?: string;
    useHermes?: boolean;
};
export declare function signAndroid(options: SignAndroidOptions): Promise<void>;
