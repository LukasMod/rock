import type { PluginApi } from '@rock-js/config';
export type SignFlags = {
    verbose?: boolean;
    path: string;
    output?: string;
    keystore?: string;
    keystorePassword?: string;
    keyAlias?: string;
    keyPassword?: string;
    buildJsbundle?: boolean;
    jsbundle?: string;
    noHermes?: boolean;
};
export declare const registerSignCommand: (api: PluginApi) => void;
