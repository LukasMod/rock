type BuildJsBundleOptions = {
    bundleOutputPath: string;
    assetsDestPath: string;
    useHermes?: boolean;
    sourcemapOutputPath?: string;
};
/**
 * This function is modelled after [react-native-xcode.sh](https://github.com/facebook/react-native/blob/main/packages/react-native/scripts/react-native-xcode.sh).
 */
export declare function buildJsBundle(options: BuildJsBundleOptions): Promise<void>;
export {};
