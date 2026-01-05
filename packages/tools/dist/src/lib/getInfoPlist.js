import { logger, spawn } from '../index.js';
export async function getInfoPlist(infoPlistPath) {
    try {
        const { stdout } = await spawn('plutil', ['-convert', 'json', '-o', '-', infoPlistPath], { stdio: 'pipe' });
        return JSON.parse(stdout);
    }
    catch (error) {
        logger.debug(`Failed to get Info.plist: ${error}`);
    }
    return null;
}
//# sourceMappingURL=getInfoPlist.js.map