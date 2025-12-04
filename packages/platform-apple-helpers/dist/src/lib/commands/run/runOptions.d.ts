import type { BuilderCommand } from '../../types/index.js';
import type { BuildFlags } from '../build/buildOptions.js';
export interface RunFlags extends BuildFlags {
    binaryPath?: string;
    port: string;
    device?: string;
    catalyst?: boolean;
    local?: boolean;
    devServer?: boolean;
    clientLogs?: boolean;
}
export declare const getRunOptions: ({ platformName }: BuilderCommand) => ({
    name: string;
    description: string;
    parse?: undefined;
    value?: undefined;
} | {
    name: string;
    description: string;
    parse: typeof import("packages/tools/dist/src/index.js").parseArgs;
    value?: undefined;
} | {
    name: string;
    description: string;
    value: string;
    parse?: undefined;
} | {
    name: string;
    default: string;
})[];
