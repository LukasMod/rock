/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export type StartCommandArgs = {
    assetPlugins?: string[];
    cert?: string;
    customLogReporterPath?: string;
    host?: string;
    https?: boolean;
    maxWorkers?: string;
    key?: string;
    platforms: string[];
    port?: string;
    resetCache?: boolean;
    sourceExts?: string[];
    transformer?: string;
    watchFolders?: string[];
    config?: string;
    projectRoot?: string;
    interactive: boolean;
    clientLogs: boolean;
};
declare function runServer(options: {
    platforms: Record<string, object>;
    reactNativeVersion: string;
    reactNativePath: string;
    root: string;
}, args: StartCommandArgs): Promise<void>;
export default runServer;
