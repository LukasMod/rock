/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { PluginApi } from '@rock-js/config';
import type { StartDevServerArgs } from '@rock-js/config';
export declare function startDevServer({ root, args, reactNativeVersion, reactNativePath, platforms, }: StartDevServerArgs): Promise<void>;
export declare const registerStartCommand: (api: PluginApi) => void;
