/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
class RevengeJs {
    constructor(options) {
        this.options = options;
    }
    sayHello(message) {
        return message;
    }
}

export { RevengeJs, RevengeJs as default };
