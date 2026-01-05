import { signAndroid } from './signAndroid.js';
const ARGUMENTS = [
    {
        name: 'binaryPath',
        description: 'Archive (apk or aab) file path',
    },
];
const OPTIONS = [
    {
        name: '--verbose',
        description: '',
    },
    {
        name: '--keystore <string>',
        description: 'Path to keystore file',
    },
    {
        name: '--keystore-password <string>',
        description: 'Password for keystore file',
    },
    {
        name: '--key-alias <string>',
        description: 'Alias for key in keystore file',
    },
    {
        name: '--key-password <string>',
        description: 'Password for key in keystore file',
    },
    {
        name: '--output <string>',
        description: 'Path to the output APK/AAB file.',
    },
    {
        name: '--build-jsbundle',
        description: 'Build the JS bundle before signing.',
    },
    {
        name: '--jsbundle <string>',
        description: 'Path to the JS bundle to apply before signing.',
    },
    {
        name: '--no-hermes',
        description: 'Do not use Hermes to build the JS bundle.',
    },
];
export const registerSignCommand = (api) => {
    api.registerCommand({
        name: 'sign:android',
        description: 'Sign the Android app with modified JS bundle.',
        args: ARGUMENTS,
        options: OPTIONS,
        action: async (binaryPath, flags) => {
            await signAndroid({
                binaryPath,
                keystorePath: flags.keystore,
                keystorePassword: flags.keystorePassword,
                keyAlias: flags.keyAlias,
                keyPassword: flags.keyPassword,
                outputPath: flags.output,
                buildJsBundle: flags.buildJsbundle,
                jsBundlePath: flags.jsbundle,
                useHermes: !flags.noHermes,
            });
        },
    });
};
//# sourceMappingURL=command.js.map