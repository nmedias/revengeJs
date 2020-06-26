/* eslint-disable @typescript-eslint/no-var-requires */
const Path = require('path');
const pkg = require('../package.json');

const pathResolve = path => paths => Path.resolve(path, ...paths);
const pathJoin = path => paths => Path.join(path, ...paths);
const camelize = s => s.replace(/-./g, x => x.toUpperCase()[1]);
const pathJoinDir = pathJoin(__dirname);
const pathResolveDir = pathResolve(__dirname);

const config = {
    src: pathResolveDir(['../src/']),
    dist: pathJoinDir(['../dist/']),
    package: pathJoinDir([`../package/${camelize(pkg.name)}`]),
    get lib() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        return {
            name: camelize(pkg.name),
            formats: ['umd'],
            get srcPath() {
                return pathResolve(self.src)(['lib']);
            },
            get buildPath() {
                return pathJoin(self.dist)([`${this.name}`]);
            },
            //externals: {},
        };
    },
    get demo() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        return {
            get srcPath() {
                return pathResolve(self.src)(['demo']);
            },
            get buildPath() {
                return pathJoin(self.dist)(['demo']);
            },
        };
    },
};

module.exports = config;
