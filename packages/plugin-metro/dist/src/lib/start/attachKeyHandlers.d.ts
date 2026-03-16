/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { TerminalReporter } from 'metro';
export default function attachKeyHandlers({ devServerUrl, messageSocket, reporter, }: {
    devServerUrl: string;
    messageSocket: {
        broadcast: (type: string, params?: Record<string, unknown> | null) => void;
    };
    reporter: TerminalReporter;
}): void;
