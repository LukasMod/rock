import { outro } from '@rock-js/tools';
import { runGradleAar } from '../runGradle.js';
export async function publishLocalAar(aarProject) {
    const tasks = ['publishToMavenLocal'];
    await runGradleAar({
        tasks,
        aarProject,
    });
    outro('Success 🎉.');
}
export const options = [
    {
        name: '--module-name <string>',
        description: 'AAR module name',
    },
];
//# sourceMappingURL=publishLocalAar.js.map