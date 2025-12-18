import type { FingerprintSources, RemoteBuildCache } from '@rock-js/tools';
export type PluginOutput = {
    name: string;
    description: string;
};
export type DevServerArgs = {
    interactive: boolean;
    clientLogs: boolean;
    port?: string;
    host?: string;
    https?: boolean;
    resetCache?: boolean;
    devServer?: boolean;
    platforms?: string[];
    [key: string]: unknown;
};
export type StartDevServerArgs = {
    root: string;
    args: DevServerArgs;
    reactNativeVersion: string;
    reactNativePath: string;
    platforms: Record<string, object>;
};
type StartDevServerFunction = (options: StartDevServerArgs) => Promise<void>;
export type BundlerPluginOutput = {
    name: string;
    description: string;
    start: StartDevServerFunction;
};
export type PlatformOutput = PluginOutput & {
    autolinkingConfig: {
        project: Record<string, unknown> | undefined;
    };
};
export type PluginApi = {
    registerCommand: (command: CommandType) => void;
    getProjectRoot: () => string;
    getReactNativeVersion: () => string;
    getReactNativePath: () => string;
    getPlatforms: () => {
        [platform: string]: object;
    };
    getRemoteCacheProvider: () => Promise<null | undefined | (() => RemoteBuildCache)>;
    getFingerprintOptions: () => FingerprintSources;
    getBundlerStart: () => ({ args }: {
        args: DevServerArgs;
    }) => void;
    getUsePrebuiltRNCore: () => number | undefined;
};
type PluginType = (args: PluginApi) => PluginOutput;
type BundlerPluginType = (args: PluginApi) => BundlerPluginOutput;
type PlatformType = (args: PluginApi) => PlatformOutput;
type ArgValue = string | string[] | boolean;
type ActionType<T = any> = (...args: T[]) => void | Promise<void>;
export type CommandType = {
    name: string;
    description: string;
    action: ActionType;
    /** Positional arguments */
    args?: Array<{
        name: string;
        description: string;
        default?: ArgValue | undefined;
    }>;
    /** Flags */
    options?: Array<{
        name: string;
        description: string;
        default?: ArgValue | undefined;
        parse?: (value: string, previous: ArgValue) => ArgValue;
    }>;
    /** Internal property to assign plugin name to particualr commands  */
    __origin?: string;
};
export type ConfigType = {
    root?: string;
    reactNativeVersion?: string;
    reactNativePath?: string;
    bundler?: BundlerPluginType;
    plugins?: PluginType[];
    platforms?: Record<string, PlatformType>;
    commands?: Array<CommandType>;
    remoteCacheProvider?: null | 'github-actions' | (() => RemoteBuildCache);
    fingerprint?: {
        extraSources?: string[];
        ignorePaths?: string[];
        env?: string[];
    };
    usePrebuiltRNCore?: number;
};
export type ConfigOutput = {
    root: string;
    commands?: Array<CommandType>;
    platforms?: Record<string, PlatformOutput>;
    bundler?: BundlerPluginOutput;
} & PluginApi;
export declare function getConfig(dir: string, internalPlugins: Array<(ownConfig: {
    platforms: ConfigOutput['platforms'];
    root: ConfigOutput['root'];
}) => PluginType>): Promise<ConfigOutput>;
export {};
