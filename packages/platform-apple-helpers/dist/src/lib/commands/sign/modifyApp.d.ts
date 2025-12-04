export type ModifyAppOptions = {
    appPath: string;
    outputPath?: string;
    buildJsBundle?: boolean;
    jsBundlePath?: string;
    useHermes?: boolean;
};
export declare const modifyApp: (options: ModifyAppOptions) => Promise<void>;
