/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra');
const path = require('path');
const config = require('./config');

const sourceBuild = config.lib.buildPath;
const destBuild = config.package;
const sourceLib = config.lib.srcPath;
const destLib = path.join(config.package, 'lib');


async function copyFiles() {
    try {
        await fs.remove(config.package);
        // eslint-disable-next-line no-console
        console.log(`${config.package} was removed`);

        await fs.copy(sourceBuild, destBuild);
        // eslint-disable-next-line no-console
        console.log(
            `New files copied from /dist/${config.lib.name} to /package/${config.lib.name}.`
        );
        await fs.copy(sourceLib, destLib);
        // eslint-disable-next-line no-console
        console.log(`New files copied from /src/lib to /package/${config.lib.name}/lib.`);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
    }
}

copyFiles();
