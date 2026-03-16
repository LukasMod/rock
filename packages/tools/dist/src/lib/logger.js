import util from 'node:util';
import { log as clackLog } from '@clack/prompts';
import isUnicodeSupported from 'is-unicode-supported';
import cacheManager from './cacheManager.js';
import { color } from './color.js';
import { isInteractive } from './isInteractive.js';
const unicode = isUnicodeSupported();
const unicodeWithFallback = (c, fallback) => unicode ? c : fallback;
const SYMBOL_DEBUG = unicodeWithFallback('●', '•');
let verbose = false;
const success = (...messages) => {
    const output = util.format(...messages);
    clackLog.success(output);
};
const info = (...messages) => {
    const output = util.format(...messages);
    clackLog.info(output);
};
const warn = (...messages) => {
    const output = util.format(...messages);
    clackLog.warn(mapLines(output, color.yellow));
};
const warnOnce = (key) => (...messages) => {
    if (cacheManager.get(`warnOnce-${key}`)) {
        return;
    }
    warn(...messages);
    cacheManager.set(`warnOnce-${key}`, 'true');
};
const error = (...messages) => {
    const output = util.format(...messages);
    clackLog.error(mapLines(output, color.red));
};
const log = (...messages) => {
    const output = util.format(...messages);
    clackLog.step(output);
};
const debug = (...messages) => {
    if (verbose) {
        const output = util.format(...messages);
        clackLog.message(mapLines(output, color.dim), {
            symbol: color.dim(SYMBOL_DEBUG),
        });
    }
};
const setVerbose = (level) => {
    verbose = level;
};
const isVerbose = () => {
    // For non-interactive environments, always show verbose logs
    return !isInteractive() || verbose;
};
export default {
    success,
    info,
    warn,
    warnOnce,
    error,
    debug,
    log,
    setVerbose,
    isVerbose,
};
function mapLines(text, colorFn) {
    return text.split('\n').map(colorFn).join('\n');
}
//# sourceMappingURL=logger.js.map