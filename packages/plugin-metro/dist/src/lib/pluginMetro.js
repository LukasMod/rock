import { registerBundleCommand } from './bundle/command.js';
import { registerStartCommand, startDevServer } from './start/command.js';
export const pluginMetro = () => (api) => {
    registerStartCommand(api);
    registerBundleCommand(api);
    return {
        name: '@rock-js/plugin-metro',
        description: 'Rock plugin for Metro bundler.',
        start: startDevServer,
    };
};
export default pluginMetro;
//# sourceMappingURL=pluginMetro.js.map