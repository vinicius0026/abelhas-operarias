(function () {
    'use strict';

    exports.config = {
        seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
        specs: [
            './app/**/*TestsE2e.js'
        ],
        framework: 'mocha',
        mochaOpts:{
            reporter: 'progress',
            slow: 3000,
            timeout: 20000
        },
        capabilities: {
            browserName: 'chrome'
        }
    };
})();
