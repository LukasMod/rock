/**
 * Source from https://github.com/sindresorhus/is-interactive/blob/main/index.js
 */
export declare function isInteractive({ stream }?: {
    stream?: (NodeJS.WriteStream & {
        fd: 1;
    }) | undefined;
}): boolean;
