export type ModifyIpaOptions = {
    platformName: string;
    ipaPath: string;
    identity?: string;
    outputPath?: string;
    buildJsBundle?: boolean;
    jsBundlePath?: string;
    useHermes?: boolean;
};
export declare const modifyIpa: (options: ModifyIpaOptions) => Promise<void>;
