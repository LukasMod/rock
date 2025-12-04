import { getBuildOptions } from '../build/buildOptions.js';
export const getRunOptions = ({ platformName }) => {
    return [
        {
            name: '--port <number>',
            default: process.env['RCT_METRO_PORT'] || '8081',
        },
        {
            name: '--binary-path <string>',
            description: 'Path relative to project root where pre-built .app binary lives.',
        },
        {
            name: '--device <string>',
            description: 'Explicitly set the device or simulator to use by name or by UDID.',
        },
        {
            name: '--catalyst',
            description: 'Run on Mac Catalyst.',
        },
        {
            name: '--client-logs',
            description: 'Enable client logs in dev server.',
        },
        {
            name: '--dev-server',
            description: 'Automatically start a dev server (bundler) after building the app.',
        },
        ...getBuildOptions({ platformName }),
    ];
};
//# sourceMappingURL=runOptions.js.map