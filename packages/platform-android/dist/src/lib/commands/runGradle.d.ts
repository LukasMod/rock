import type { AarProject } from './aar/packageAar.js';
import type { BuildFlags } from './buildAndroid/buildAndroid.js';
import type { AndroidProject, Flags } from './runAndroid/runAndroid.js';
type RunGradleAarArgs = {
    tasks: string[];
    aarProject: AarProject;
    variant?: string;
};
export type RunGradleArgs = {
    tasks: string[];
    androidProject: AndroidProject;
    args: BuildFlags | Flags;
    artifactName: string;
};
export declare function runGradle({ tasks, androidProject, args, artifactName, }: RunGradleArgs): Promise<void>;
export declare function runGradleAar({ tasks, aarProject, variant, }: RunGradleAarArgs): Promise<void>;
export declare function getGradleWrapper(): "gradlew.bat" | "./gradlew";
export {};
