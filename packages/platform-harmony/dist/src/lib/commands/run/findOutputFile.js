import fs from 'node:fs';
import path from 'node:path';
export async function findOutputFile(sourceDir, module, device) {
    let hapName;
    if (device?.type === 'emulator') {
        hapName = `${module}-default-unsigned.hap`;
    }
    else {
        hapName = `${module}-default-signed.hap`;
    }
    const pathToHap = path.join(sourceDir, module, 'build', 'default', 'outputs', 'default', hapName);
    return fs.existsSync(pathToHap) ? pathToHap : undefined;
}
//# sourceMappingURL=findOutputFile.js.map