/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { TerminalReporter } from 'metro';
export default class OpenDebuggerKeyboardHandler {
    #private;
    constructor({ devServerUrl, reporter, }: {
        devServerUrl: string;
        reporter: TerminalReporter;
    });
    /**
     * Used in response to 'j' to debug - fetch the available debug targets and:
     *  - If no targets, warn
     *  - If one target, open it
     *  - If more, show a list. The keyboard listener should run subsequent key
     *    presses through maybeHandleTargetSelection, which will launch the
     *    debugger if a match is made.
     */
    handleOpenDebugger(): Promise<void>;
    /**
     * Handle key presses that correspond to a valid selection from a visible
     * selection list.
     *
     * @return true if we've handled the key as a target selection, false if the
     *   caller should handle the key.
     */
    maybeHandleTargetSelection(keyName: string): boolean;
    /**
     * Dismiss any target selection UI, if shown.
     */
    dismiss(): void;
}
