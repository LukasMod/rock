/**
 * Indicates whether or not the dev server is running. It returns a promise that
 * returns one of these possible values:
 *   - `{status: 'running', root: string}`: the dev server is running
 *   - `{status: 'not_running'}`: the dev server nor any process is running on the expected port.
 *   - `{status: 'unrecognized'}`: one other process is running on the port we expect the dev server to be running.
 */
export declare function isDevServerRunning(port?: string | number): Promise<{
    status: 'running';
    root: string;
} | {
    status: 'not_running' | 'unrecognized';
}>;
