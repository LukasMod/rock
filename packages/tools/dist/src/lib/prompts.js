import * as clack from '@clack/prompts';
import { isInteractive } from './isInteractive.js';
import logger from './logger.js';
export function intro(title) {
    return clack.intro(title);
}
export function outro(message) {
    return clack.outro(message);
}
export function note(message, title) {
    return clack.note(message, title);
}
export async function promptText(options) {
    const result = await clack.text(options);
    if (clack.isCancel(result)) {
        cancelPromptAndExit();
    }
    return result;
}
export async function promptPassword(options) {
    const result = await clack.password(options);
    if (clack.isCancel(result)) {
        cancelPromptAndExit();
    }
    return result;
}
export async function promptSelect(options) {
    // If there is only one option, return it immediately
    if (options.options.length === 1) {
        return options.options[0].value;
    }
    const result = await clack.select(options);
    if (clack.isCancel(result)) {
        cancelPromptAndExit();
    }
    return result;
}
export async function promptConfirm(options) {
    const result = await clack.select({
        message: options.message,
        options: [
            { value: true, label: options.confirmLabel ?? 'Confirm' },
            { value: false, label: options.cancelLabel ?? 'Cancel' },
        ],
    });
    if (clack.isCancel(result)) {
        cancelPromptAndExit();
    }
    return result === true;
}
export async function promptMultiselect(options) {
    const result = await clack.multiselect(options);
    if (clack.isCancel(result)) {
        cancelPromptAndExit();
    }
    return result;
}
export async function promptGroup(prompts, options) {
    const result = await clack.group(prompts, options);
    if (clack.isCancel(result)) {
        cancelPromptAndExit();
    }
    return result;
}
export function spinner(options) {
    if (options?.silent) {
        return {
            start: () => { },
            stop: () => { },
            message: () => { },
        };
    }
    if (logger.isVerbose() || !isInteractive()) {
        return {
            start: (message) => logger.log(formatStartMessage(message)),
            stop: (message, code = 0) => {
                return code === 0 ? logger.log(message) : logger.error(message);
            },
            message: (message) => logger.log(formatStartMessage(message)),
        };
    }
    const clackSpinner = clack.spinner(options);
    return {
        start: (message) => {
            clackSpinner.start(message);
        },
        stop: (message, code) => {
            clackSpinner.stop(message, code);
        },
        message: (message) => {
            clackSpinner.message(message);
        },
    };
}
export function formatStartMessage(text) {
    if (text === undefined) {
        return undefined;
    }
    const messageWithoutDots = text.replace(/\.+$/, '');
    return `${messageWithoutDots}...`;
}
export function cancelPromptAndExit(message) {
    clack.cancel(message ?? 'Operation cancelled by user.');
    process.exit(0);
}
//# sourceMappingURL=prompts.js.map