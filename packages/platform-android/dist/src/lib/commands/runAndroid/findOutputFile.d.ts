import type { AndroidProject } from './runAndroid.js';
export declare function findOutputFile(androidProject: AndroidProject, tasks: string[], device?: string): Promise<string | false | undefined>;
export declare function getInstallOutputFileName(appName: string, variant: string, buildDirectory: string, apkOrAab: 'apk' | 'aab', device: string | undefined): Promise<string | undefined>;
