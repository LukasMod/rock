import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { RockError, spawn, SubprocessError } from '@rock-js/tools';
const execFileAsync = promisify(execFile);
export async function readKeyFromPlist(plistPath, key, options = {}) {
    try {
        const result = await plistBuddy(plistPath, `Print:${key}`, options);
        return result.stdout.trim();
    }
    catch (error) {
        throw new RockError(`Error reading key ${key} from ${plistPath}`, {
            cause: error instanceof SubprocessError ? error.stderr : error,
        });
    }
}
async function plistBuddy(path, command, options) {
    const args = ['-c', command, path];
    if (options?.xml) {
        args.unshift('-x');
    }
    const result = await spawn('/usr/libexec/PlistBuddy', args, {
        stdio: 'pipe',
    });
    return result;
}
export async function readBufferFromPlist(plistPath, key) {
    try {
        const result = await binaryPlistBuddy(plistPath, `Print:${key}`);
        return Buffer.from(result.stdout, 'binary');
    }
    catch (error) {
        throw new RockError(`Error reading key ${key} from ${plistPath}`, {
            cause: error instanceof SubprocessError ? error.stderr : error,
        });
    }
}
/**
 * Special version of plistBuddy that reads the output as binary. Use `execFile`
 * instead of nano-spawn which does not support binary output.
 */
async function binaryPlistBuddy(path, command) {
    const args = ['-c', command, path];
    const result = await execFileAsync('/usr/libexec/PlistBuddy', args, {
        encoding: 'binary',
    });
    return result;
}
//# sourceMappingURL=plist.js.map