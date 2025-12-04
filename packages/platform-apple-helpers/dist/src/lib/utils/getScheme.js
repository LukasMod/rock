import { isInteractive, logger, promptSelect, RockError } from '@rock-js/tools';
import path from 'path';
export async function getScheme(schemes, preselectedScheme, projectName) {
    let scheme = preselectedScheme;
    if (schemes && schemes.length > 1 && !preselectedScheme) {
        if (isInteractive()) {
            scheme = await promptForSchemeSelection(schemes);
            logger.info(`You can set scheme manually next time using "--scheme ${scheme}" flag.`);
        }
    }
    if (!scheme) {
        scheme = path.basename(projectName, path.extname(projectName));
    }
    invalidateScheme(schemes, scheme);
    return scheme;
}
function invalidateScheme(schemes, scheme) {
    if (!schemes || schemes.length === 0) {
        logger.warn(`Unable to check whether "${scheme}" scheme exists in your project`);
        return;
    }
    if (!schemes.includes(scheme)) {
        throw new RockError(`Scheme "${scheme}" doesn't exist. Please use one of the existing schemes: ${schemes
            .map((scheme) => `\n- ${scheme}`)
            .join('')}`);
    }
}
function promptForSchemeSelection(schemes) {
    return promptSelect({
        message: 'Select the scheme you want to use',
        options: schemes.map((value) => ({
            label: value,
            value: value,
        })),
    });
}
//# sourceMappingURL=getScheme.js.map