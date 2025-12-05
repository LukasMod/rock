import type { BuildFlags } from './build/buildHarmony.js';
import type { DeviceData } from './run/listHarmonyDevices.js';
import type { Flags } from './run/runHarmony.js';
export type RunHvigorArgs = {
    sourceDir: string;
    bundleName: string;
    args: BuildFlags | Flags;
    artifactName: string;
    device?: DeviceData;
};
export declare function runHvigor({ sourceDir, bundleName, args, artifactName, device, }: RunHvigorArgs): Promise<void>;
