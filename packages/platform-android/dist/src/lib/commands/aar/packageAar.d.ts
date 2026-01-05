export interface AarProject {
    sourceDir: string;
    moduleName: string;
}
export type PackageAarFlags = {
    variant: string;
    moduleName?: string;
};
export declare function packageAar(aarProject: AarProject, args: PackageAarFlags): Promise<void>;
export declare function localPublishAar(aarProject: AarProject, args: PackageAarFlags): Promise<void>;
export declare const options: {
    name: string;
    description: string;
}[];
