import type { ConfigOutput, PluginApi } from '@rock-js/config';
export declare const logConfig: (args: {
    platform?: string;
}, ownConfig: {
    platforms: ConfigOutput["platforms"];
    root: ConfigOutput["root"];
}) => Promise<void>;
export declare const logConfigPlugin: (ownConfig: {
    platforms: ConfigOutput["platforms"];
    root: ConfigOutput["root"];
}) => (api: PluginApi) => {
    name: string;
    description: string;
};
