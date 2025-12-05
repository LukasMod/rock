import { outro } from '@rock-js/tools';
import { runGradleAar } from '../runGradle.js';
import { toPascalCase } from '../toPascalCase.js';
export async function packageAar(aarProject, args) {
    normalizeArgs(args);
    const tasks = [`assemble${toPascalCase(args.variant)}`];
    await runGradleAar({ tasks, aarProject, variant: args.variant });
    outro('Success 🎉.');
}
export async function localPublishAar(aarProject, args) {
    const tasks = ['publishToMavenLocal'];
    await runGradleAar({
        tasks,
        aarProject,
        variant: args.variant,
    });
    outro('Success 🎉.');
}
function normalizeArgs(args) {
    if (!args.variant) {
        args.variant = 'debug';
    }
}
export const options = [
    {
        name: '--variant <string>',
        description: "Specify your app's build variant, which is constructed from build type and product flavor, e.g. 'debug' or 'freeRelease'.",
    },
    {
        name: '--module-name <string>',
        description: 'AAR module name',
    },
];
//# sourceMappingURL=packageAar.js.map