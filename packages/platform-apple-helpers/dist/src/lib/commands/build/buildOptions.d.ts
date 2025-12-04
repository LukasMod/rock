import { parseArgs } from '@rock-js/tools';
import type { BuilderCommand } from '../../types/index.js';
export type BuildFlags = {
    verbose?: boolean;
    configuration?: string;
    scheme?: string;
    target?: string;
    extraParams?: string[];
    exportExtraParams?: string[];
    exportOptionsPlist?: string;
    buildFolder?: string;
    destination?: string[];
    archive?: boolean;
    installPods: boolean;
    newArch: boolean;
    local?: boolean;
};
export declare const getBuildOptions: ({ platformName }: BuilderCommand) => ({
    name: string;
    description: string;
    parse?: undefined;
    value?: undefined;
} | {
    name: string;
    description: string;
    parse: typeof parseArgs;
    value?: undefined;
} | {
    name: string;
    description: string;
    value: string;
    parse?: undefined;
})[];
