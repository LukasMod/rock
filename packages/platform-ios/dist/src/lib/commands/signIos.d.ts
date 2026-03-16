import type { PluginApi } from '@rock-js/config';
export type SignFlags = {
    app: string;
    output?: string;
    identity?: string;
    buildJsbundle?: boolean;
    jsbundle?: string;
    noHermes?: boolean;
};
export declare const registerSignCommand: (api: PluginApi) => void;
