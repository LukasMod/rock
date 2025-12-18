import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
export const getTempDirectory = (name) => path.resolve(os.tmpdir(), name);
export const cleanup = (directory) => {
    fs.rmSync(directory, { recursive: true, force: true, maxRetries: 10 });
};
/**
 * Creates a nested directory with files and their contents
 * writeFiles(
 *   '/home/tmp',
 *   {
 *     'package.json': '{}',
 *     'dir/file.js': 'module.exports = "x";',
 *   }
 * );
 */
export const writeFiles = (directory, files) => {
    createDirectory(directory);
    Object.keys(files).forEach((fileOrPath) => {
        const dirname = path.dirname(fileOrPath);
        if (dirname !== '/') {
            createDirectory(path.join(directory, dirname));
        }
        fs.writeFileSync(path.resolve(directory, ...fileOrPath.split('/')), files[fileOrPath]);
    });
};
function createDirectory(path) {
    try {
        fs.mkdirSync(path, { recursive: true });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        if (error.code !== 'EEXIST') {
            throw error;
        }
    }
}
//# sourceMappingURL=test-helpers.js.map