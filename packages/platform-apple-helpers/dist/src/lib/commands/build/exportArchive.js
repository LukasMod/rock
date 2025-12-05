import { colorLink, relativeToCwd, RockError, spawn, spinner, } from '@rock-js/tools';
import { existsSync, readdirSync } from 'fs';
import path from 'path';
import { getBuildPaths } from '../../utils/getBuildPaths.js';
export const exportArchive = async ({ sourceDir, archivePath, platformName, exportExtraParams, exportOptionsPlist, }) => {
    const loader = spinner();
    loader.start('Exporting the archive...');
    const exportOptionsPlistPath = path.join(sourceDir, exportOptionsPlist ?? 'ExportOptions.plist');
    if (!existsSync(exportOptionsPlistPath)) {
        loader.stop('Failed to export the archive.', 1);
        throw new RockError(`ExportOptions.plist not found, please create ${colorLink(relativeToCwd(exportOptionsPlistPath))} file with valid configuration for Archive export.`);
    }
    const { exportDir } = getBuildPaths(platformName);
    const xcodebuildArgs = [
        '-exportArchive',
        '-archivePath',
        archivePath,
        '-exportPath',
        exportDir,
        '-exportOptionsPlist',
        exportOptionsPlistPath,
        ...exportExtraParams,
    ];
    try {
        let ipaFiles = [];
        await spawn('xcodebuild', xcodebuildArgs, {
            cwd: sourceDir,
            stdio: 'pipe',
        });
        try {
            ipaFiles = readdirSync(exportDir).filter((file) => file.endsWith('.ipa'));
        }
        catch {
            ipaFiles = [];
        }
        loader.stop(`Archive available at: ${colorLink(path.join(exportDir, ipaFiles[0]) ?? exportDir)}`);
        return { ipaPath: path.join(exportDir, ipaFiles[0]) };
    }
    catch (error) {
        loader.stop('Running xcodebuild failed.', 1);
        throw new Error('Running xcodebuild failed', {
            cause: error.stderr,
        });
    }
};
//# sourceMappingURL=exportArchive.js.map