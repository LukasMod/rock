export type HarmonyProjectConfig = {
    sourceDir: string;
    bundleName: string;
    signingConfigs: boolean | undefined;
};
export declare function getValidProjectConfig(projectRoot: string, pluginConfig?: Partial<HarmonyProjectConfig>): {
    sourceDir: string;
    bundleName: string;
    signingConfigs: boolean | undefined;
};
