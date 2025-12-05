import type { AndroidProject } from './runAndroid.js';
export declare function findOutputFile(androidProject: AndroidProject, tasks: string[], device?: string): Promise<string | false | undefined>;
