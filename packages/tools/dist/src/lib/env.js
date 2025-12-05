export function getLocalOS() {
    if (process.platform === 'darwin') {
        return 'macos';
    }
    if (process.platform === 'win32') {
        return 'windows';
    }
    // Otherwise, assume it's linux-like
    return 'linux';
}
//# sourceMappingURL=env.js.map