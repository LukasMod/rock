/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Create a dev-middleware logger object that will emit logs via Metro's
 * terminal reporter.
 */
export default function createDevMiddlewareLogger(reporter) {
    return {
        info: makeLogger(reporter, 'info'),
        warn: makeLogger(reporter, 'warn'),
        error: makeLogger(reporter, 'error'),
    };
}
function makeLogger(reporter, level) {
    return (...data) => reporter.update({
        // @ts-expect-error - metro types are not updated
        type: 'unstable_server_log',
        // @ts-expect-error - metro types are not updated
        level,
        data,
    });
}
//# sourceMappingURL=createDevMiddlewareLogger.js.map