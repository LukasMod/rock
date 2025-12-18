import { colorLink, formatArtifactName, getBinaryPath, logger, outro, relativeToCwd, } from '@rock-js/tools';
import { findOutputFile } from '../run/findOutputFile.js';
import { runHvigor } from '../runHvigor.js';
export async function buildHarmony(harmonyConfig, args, projectRoot, remoteCacheProvider, fingerprintOptions) {
    const { sourceDir, bundleName } = harmonyConfig;
    const artifactName = await formatArtifactName({
        platform: 'harmony',
        traits: [args.buildMode],
        root: projectRoot,
        fingerprintOptions,
    });
    const binaryPath = await getBinaryPath({
        platformName: 'harmony',
        artifactName,
        localFlag: args.local,
        remoteCacheProvider,
        fingerprintOptions,
        sourceDir,
    });
    if (!binaryPath) {
        await runHvigor({ sourceDir, args, artifactName, bundleName });
    }
    if (binaryPath) {
        logger.log(`Build available at: ${colorLink(relativeToCwd(binaryPath))}`);
    }
    else {
        const signedHapPath = await findOutputFile(sourceDir, args.module, {
            deviceId: undefined,
            readableName: undefined,
            type: 'phone',
            connected: false,
        });
        if (signedHapPath) {
            logger.log(`Signed build available at: ${colorLink(relativeToCwd(signedHapPath))}`);
        }
        const unsignedHapPath = await findOutputFile(sourceDir, args.module, {
            deviceId: undefined,
            readableName: undefined,
            type: 'emulator',
            connected: false,
        });
        if (unsignedHapPath) {
            logger.log(`Unsigned build available at: ${colorLink(relativeToCwd(unsignedHapPath))}`);
        }
    }
    outro('Success 🎉.');
}
export const options = [
    {
        name: '--local',
        description: 'Force local build with Gradle wrapper.',
    },
    {
        name: '--module <string>',
        description: 'Name of the OH module to run.',
        default: 'entry',
    },
    {
        name: '--build-mode <string>',
        description: `Specify your app's build mode, e.g. "debug" or "release".`,
        default: 'debug',
    },
    {
        name: '--product <string>',
        description: 'OpenHarmony product defined in build-profile.json5.',
        default: 'default',
    },
];
//# sourceMappingURL=buildHarmony.js.map