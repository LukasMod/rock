import * as clack from '@clack/prompts';
export declare function intro(title?: string): void;
export declare function outro(message?: string): void;
export declare function note(message?: string, title?: string): void;
export declare function promptText(options: clack.TextOptions): Promise<string>;
export declare function promptPassword(options: clack.PasswordOptions): Promise<string>;
export declare function promptSelect<T>(options: clack.SelectOptions<T>): Promise<T>;
type ConfirmOptions = {
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
};
export declare function promptConfirm(options: ConfirmOptions): Promise<boolean>;
export declare function promptMultiselect<T>(options: clack.MultiSelectOptions<T>): Promise<T[]>;
export declare function promptGroup<T>(prompts: clack.PromptGroup<T>, options?: clack.PromptGroupOptions<T> | undefined): Promise<{ [P in keyof clack.PromptGroupAwaitedReturn<T>]: clack.PromptGroupAwaitedReturn<T>[P]; }>;
export declare function spinner(options?: clack.SpinnerOptions & {
    silent?: boolean;
}): {
    start: (message?: string) => void;
    stop: (message?: string, code?: number) => void;
    message: (message?: string) => void;
};
export declare function formatStartMessage(text: string | undefined): string | undefined;
export declare function cancelPromptAndExit(message?: string): never;
export {};
