type BuildJsBundleOptions = {
    bundleOutputPath: string;
    assetsDestPath: string;
    sourcemapOutputPath: string;
    useHermes?: boolean;
};
export declare function buildJsBundle(options: BuildJsBundleOptions): Promise<void>;
export {};
