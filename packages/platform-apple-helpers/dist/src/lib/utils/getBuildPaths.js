import path from 'node:path';
import { getCacheRootPath } from '@rock-js/tools';
export const getBuildPaths = (platformName) => {
    const buildDir = path.join(getCacheRootPath(), platformName);
    return {
        buildDir,
        exportDir: path.join(buildDir, 'export'),
        archiveDir: path.join(buildDir, 'archive'),
        packageDir: path.join(buildDir, 'package'),
        derivedDataDir: path.join(buildDir, 'derivedData'),
    };
};
//# sourceMappingURL=getBuildPaths.js.map