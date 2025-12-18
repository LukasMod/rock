/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { ConfigT, YargArguments } from 'metro-config';
export type ConfigLoadingContext = Readonly<{
    root: string;
    reactNativePath: string;
    platforms: Record<string, object>;
}>;
/**
 * Load Metro config.
 *
 * Allows the CLI to override select values in `metro.config.js` based on
 * dynamic user options in `ctx`.
 */
export default function loadMetroConfig(ctx: {
    platforms: Record<string, object>;
    reactNativeVersion: string;
    reactNativePath: string;
    root: string;
}, options?: YargArguments): Promise<ConfigT>;
