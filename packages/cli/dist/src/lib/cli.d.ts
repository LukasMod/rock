type CliOptions = {
    cwd: string;
    argv: string[];
};
export declare const cli: ({ cwd, argv }: CliOptions) => Promise<void>;
export {};
