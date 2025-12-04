import { spawn } from '@rock-js/tools';
export async function runOnMacCatalyst(binaryPath, scheme) {
    const appProcess = spawn(`${binaryPath}/${scheme}`, [], {
        detached: true,
        stdio: 'ignore',
    });
    (await appProcess.nodeChildProcess).unref();
}
//# sourceMappingURL=runOnMacCatalyst.js.map