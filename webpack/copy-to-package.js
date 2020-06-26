/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');
const path = require('path');
const config = require('./config');

const sourceBuild = config.lib.buildPath;
const destBuild = config.package;
const sourceLib = config.lib.srcPath;
const destLib = path.join(config.package, 'lib');

async function copyFiles() {
    const green = '\x1b[32m%s\x1b[0m'
    const cyan = '\x1b[36m%s\x1b[0m'
    const ascii = `
░░░░░░  ░░░░░░░ ░░    ░░ ░░░░░░░ ░░░    ░░  ░░░░░░  ░░░░░░░      ░░ ░░░░░░░ 
▒▒   ▒▒ ▒▒      ▒▒    ▒▒ ▒▒      ▒▒▒▒   ▒▒ ▒▒       ▒▒           ▒▒ ▒▒      
▒▒▒▒▒▒  ▒▒▒▒▒   ▒▒    ▒▒ ▒▒▒▒▒   ▒▒ ▒▒  ▒▒ ▒▒   ▒▒▒ ▒▒▒▒▒        ▒▒ ▒▒▒▒▒▒▒ 
▓▓   ▓▓ ▓▓       ▓▓  ▓▓  ▓▓      ▓▓  ▓▓ ▓▓ ▓▓    ▓▓ ▓▓      ▓▓   ▓▓      ▓▓ 
██   ██ ███████   ████   ███████ ██   ████  ██████  ███████  █████  ███████   `;

    console.log('\x1b[36m%s\x1b[0m', ascii);

    try {
        await fs.remove(config.package);
        // eslint-disable-next-line no-console

        console.log(`${cyan}`, `▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
        `)

        console.log(`${cyan}`, `Package files are going to be re-created.`);

        await fs.copy(sourceBuild, destBuild);
        // eslint-disable-next-line no-console
        console.log(`${green}`, `New files copied from /dist/${config.lib.name} to /package/${config.lib.name}.`);
        await fs.copy(sourceLib, destLib);
        // eslint-disable-next-line no-console
        console.log(`${green}`, `New files copied from /src/lib to /package/${config.lib.name}/lib.`);

    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
    }
}

copyFiles();
