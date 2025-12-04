declare const _default: {
    success: (...messages: Array<unknown>) => void;
    info: (...messages: Array<unknown>) => void;
    warn: (...messages: Array<unknown>) => void;
    warnOnce: (key: string) => (...messages: Array<unknown>) => void;
    error: (...messages: Array<unknown>) => void;
    debug: (...messages: Array<unknown>) => void;
    log: (...messages: Array<unknown>) => void;
    setVerbose: (level: boolean) => void;
    isVerbose: () => boolean;
};
export default _default;
