import { exec } from 'node:child_process';
export const execAsync = (command, options) => {
    return new Promise((resolve, reject) => {
        exec(command, options, (error, stdout, stderr) => {
            if (error) {
                reject(`exec error: ${error}\n\n${stdout}\n\n${stderr}`);
                return;
            }
            resolve(stdout);
        });
    });
};
//# sourceMappingURL=exec.js.map