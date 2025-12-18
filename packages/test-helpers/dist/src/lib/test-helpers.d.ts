export declare const getTempDirectory: (name: string) => string;
export declare const cleanup: (directory: string) => void;
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
export declare const writeFiles: (directory: string, files: {
    [filename: string]: string | NodeJS.ArrayBufferView;
}) => void;
