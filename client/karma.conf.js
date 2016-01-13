'use strict';

// Karma configuration

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '.',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai', 'sinon'],


        // list of files / patterns to load in the browser
        files: [
            // Third party files
            {pattern: 'bower_components/angular/angular.js', included: true},
            {pattern: 'bower_components/angular-mocks/angular-mocks.js', included: true},
            {pattern: 'bower_components/sinon/index.js', included: true},
            {pattern: 'bower_components/jquery/dist/jquery.js', included: true},

            // App files
            {pattern: 'app/**/*.js', included: true},
            {pattern: 'app/app.js', included: true},

            // Components files
            {pattern: 'components/**/*.js', included: true}
        ],


        // list of files to exclude
        exclude: [
            'app/**/*TestsE2e.js'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './app/**/{*.js,!(*Test*).js}': ['coverage'],
            './components/**/{*.js,!(*Test*).js}': ['coverage']
        },

        coverageReporter: {
            type: 'text-summary',
            watermarks: {
                statements: [50, 75],
                functions: [50, 75],
                branches: [50, 75],
                lines: [50, 75]
            }
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values:
        // config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    });
};
