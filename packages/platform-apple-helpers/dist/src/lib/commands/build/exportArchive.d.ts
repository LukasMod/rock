export declare const exportArchive: ({ sourceDir, archivePath, platformName, exportExtraParams, exportOptionsPlist, }: {
    sourceDir: string;
    archivePath: string;
    platformName: string;
    exportExtraParams: string[];
    exportOptionsPlist?: string;
}) => Promise<{
    ipaPath: string;
}>;
