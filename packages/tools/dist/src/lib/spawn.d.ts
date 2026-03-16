import type { Options, Subprocess } from 'nano-spawn';
import { SubprocessError } from 'nano-spawn';
export declare function spawn(file: string, args?: readonly string[], options?: Options): Subprocess;
export { SubprocessError };
