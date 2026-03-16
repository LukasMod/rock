export declare function templateIndexHtmlIOS({ appName, version, bundleIdentifier, }: {
    appName: string;
    version: string;
    bundleIdentifier: string;
}): string;
export declare function templateManifestPlist({ baseUrl, ipaName, bundleIdentifier, version, appName, platformIdentifier, }: {
    baseUrl: string;
    ipaName: string;
    bundleIdentifier: string;
    version: string;
    appName: string;
    platformIdentifier: string;
}): string;
export declare function templateIndexHtmlAndroid({ appName, version, packageName, }: {
    appName: string;
    version: string;
    packageName: string;
}): string;
