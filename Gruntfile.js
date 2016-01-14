'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var timer = require('grunt-timer'),
        configs = {
            app: './client',
            tempPath: './client/tmp',
            distPath: './client/dist',
            buildPath: grunt.option('path') || './client/build',
            productionPath: grunt.option('path') || './client/build'
        };

    timer.init(grunt, {
        friendlyTime: false,
        color: 'blue'
    });

    grunt.initConfig({

        /************************************************************************
         * General Configurations
         ************************************************************************/

        config: configs,

        // Enviroment variables configurations
        env: {
            test: {
                NODE_ENV: 'test'
            },
            prod: {
                NODE_ENV: 'prod'
            }
        },

        // Hint JavaScript errors
        jshint: {
            options: {
                jshintrc: true,
                reporter: require('jshint-stylish')
            },
            all: [
                '<%= config.app %>/app/**/*.js',
                '<%= config.app %>/components/**/*.js',
                'Gruntfile.js',
                'karma.conf.js',
                './server/**/*.js'
            ]
        },

        // Hint JavaScript code styles
        jscs: {
            options: {
                config: '.jscsrc',
                reporter: require('jscs-stylish').path
            },
            all: [
                './client/app/**/*.js',
                './client/components/**/*.js',
                'Gruntfile.js',
                'karma.conf.js',
                './server/**/*.js'
            ]
        },

        // TODO: fix this to add bootstrap automatically
        // Automatically inject Bower components
        wiredep: {
            build: {
                src: ['./client/index.html'],
                exclude: [
                    './client/bower_components/roboto-fontface',
                    './client/bower_components/br-masks/releases/br-masks.js',
                    './client/bower_components/angular-br-filters/src/filters.js'
                ]
            },
            prod: {
                src: ['./client/index.html'],
                exclude: [
                    './client/bower_components/roboto-fontface',
                    './client/bower_components/sinon/index.js',
                    './client/bower_components/br-masks/releases/br-masks.js',
                    './client/bower_components/angular-br-filters/src/filters.js'
                ]
            }
        },

        // Compile Stylus files into CSS files
        sass: {
            build: {
                options: {
                    style: 'expanded',
                    trace: true,
                    unixNewlines: true,
                    lineNumbers: true,
                    cacheLocation: '<%= config.tempPath %>/sass-cache'
                },
                files: {
                    '<%= config.buildPath %>/css/main.css': '<%= config.app %>/assets/scss/appDev.scss'
                }
            },
            prod: {
                options: {
                    style: 'compressed',
                    unixNewlines: true,
                    cacheLocation: '<%= config.tempPath %>/sass-cache'
                },
                files: {
                    '<%= config.app %>/css/main.css': '<%= config.app %>/assets/scss/appProd.scss'
                }
            }
        },

        // SCSS lint
        scsslint: {
            allFiles: [
                '<%= config.app %>/app/**/*.scss',
                '<%= config.app %>/assets/scss/*.scss'
            ],
            options: {
                colorizeOutput: true,
                maxBuffer: 2000 * 1024,
                config: '<%= config.app %>/.scss-lint.yml'
            }
        },

        // Remove desired directories
        clean: {
            build: {
                src: [
                    '<%= config.tempPath %>',
                    '<%= config.distPath %>',
                    '<%= config.buildPath %>',
                    '<%= config.app %>/js',
                    '<%= config.app %>/css'
                ]
            },
            prod: {
                options: {
                    force: true
                },
                src: [
                    '<%= config.tempPath %>',
                    '<%= config.distPath %>',
                    '<%= config.buildPath %>',
                    '<%= config.productionPath %>'
                ]
            },
            after: {
                src: [
                    '<%= config.app %>/js',
                    '<%= config.app %>/css',
                    '<%= config.tempPath %>',
                    '<%= config.distPath %>',
                    '<%= config.app %>/js',
                    '<%= config.app %>/css'
                ]
            }
        },

        // Copy files to a desired location
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>/',
                        src: ['index.html'],
                        dest: '<%= config.buildPath %>/',
                        flatten: true,
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app %>/',
                        src: ['app/**'],
                        dest: '<%= config.buildPath %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app %>/',
                        src: ['assets/**'],
                        dest: '<%= config.buildPath %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app %>/',
                        src: ['bower_components/**'],
                        dest: '<%= config.buildPath %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app %>/',
                        src: ['components/**'],
                        dest: '<%= config.buildPath %>/'
                    }
                ]
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>/',
                        src: ['index.html'],
                        dest: '<%= config.distPath %>/',
                        flatten: true,
                        filter: 'isFile'
                    }
                ]
            },
            prod: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.distPath %>/',
                        src: ['index.html'],
                        dest: '<%= config.productionPath %>/',
                        flatten: true,
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.distPath %>/',
                        src: ['js/**', 'css/**'],
                        dest: '<%= config.productionPath %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app %>/',
                        src: ['assets/images/**'],
                        dest: '<%= config.productionPath %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app %>/',
                        src: ['assets/vendor/**/*'],
                        dest: '<%= config.productionPath %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app %>/bower_components/font-awesome/',
                        src: ['fonts/**'],
                        dest: '<%= config.productionPath %>/assets/'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app %>/bower_components/roboto-fontface/',
                        src: ['fonts/**'],
                        dest: '<%= config.productionPath %>/assets/'
                    }
                ]
            }
        },

        // Add hash on file name to avoid caching
        filerev: {
            options: {
                algorithm: 'md5',
                length: 4
            },
            prod: {
                src: [
                    '<%= config.distPath %>/js/**/*.js',
                    '<%= config.distPath %>/css/**/*.css'
                ]
            }
        },

        // Prepare files to be compressed and uglified
        useminPrepare: {
            html: ['<%= config.app %>/index.html'],
            options: {
                dest: '<%= config.distPath %>/',
                flow: {
                    html: {
                        steps: {
                            js: ['concat'],
                            css: ['concat', 'cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Change file paths to concatenated and filereved ones
        usemin: {
            html: ['<%= config.distPath %>/index.html'],
            options: {
                dest: '<%= config.distPath %>/'
            }
        },

        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            prod: {
                files: {
                    '<%= config.distPath %>/js/app.js': '<%= config.distPath %>/js/app.js'
                }
            }
        },

        // Uglify just concatenated app.js file
        uglify: {
            prod: {
                files: [{
                    expand: true,
                    cwd: '<%= config.distPath %>/js/',
                    src: 'app.js',
                    dest: '<%= config.distPath %>/js/'
                }, {
                    expand: true,
                    cwd: '<%= config.distPath %>/js/',
                    src: 'vendor.js',
                    dest: '<%= config.distPath %>/js/'
                }]
            }
        },

        // Generate template cache
        html2js: {
            options: {
                module: 'templates-fiddus',
                quoteChar: '\'',
                useStrict: true,
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            build: {
                src: [
                    '<%= config.app %>/app/**/*Tpl.html',
                    '<%= config.app %>/components/**/*Tpl.html'
                ],
                dest: '<%= config.buildPath %>/js/templates.js',
                rename: function (moduleName) {
                    return moduleName.replace('../app/', '');
                }
            },
            prod: {
                src: [
                    '<%= config.app %>/app/**/*Tpl.html',
                    '<%= config.app %>/components/**/*Tpl.html'
                ],
                dest: '<%= config.app %>/js/templates.js',
                rename: function (moduleName) {
                    return moduleName.replace('../client/app/', '');
                }
            }
        },

        // Minify HTML
        htmlmin: {
            deploy: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.productionPath %>/',
                    src: ['index.html'],
                    dest: '<%= config.productionPath %>/'
                }]
            }
        },

        // Client tests
        karma: {
            unit: {
                configFile: '<%= config.app %>/karma.conf.js',
                autoWatch: false,
                singleRun: true
            }
        },


        // Protractor Tests
        protractor: {
            options: {
                configFile: '<%= config.app %>/e2e-conf.js',
                noColor: false,
                args: {}
            },
            e2e: {
                options: {
                    keepAlive: false
                }
            }
        },

        // Connect application
        connect: {
            all: {
                options: {
                    port: 3000,
                    livereload: true,
                    hostname: 'localhost'
                }
            },
            livereload: {
                options: {
                    open: true,
                    port: 3000,
                    base: [
                        '<%= config.buildPath %>/'
                    ]
                }
            },
            test: {
                options: {
                    port: 3001,
                    hostname: 'localhost',
                    // set the location of the application files
                    base: [
                        '<%= config.buildPath %>/'
                    ]
                }
            }
        },

        // Watch and live reload code
        watch: {
            options: {
                livereload: true,
                dateFormat: function (time) {
                    grunt.log.writeln('File changed changed in ' + time + ' ms at ' + (new Date()).toString());
                    grunt.log.writeln('Waiting for more changes...');
                }
            },
            gruntfile: {
                files: [
                    './Gruntfile.js'
                ],
                tasks: ['jshint', 'jscs']
            },
            html: {
                files: [
                    '<%= config.app %>/app/**/*.html',
                    '<%= config.app %>/index.html'
                ],
                tasks: ['html2js:build', 'copy:build']
            },
            sass: {
                files: [
                    '<%= config.app %>/app/**/*.scss',
                    '<%= config.app %>/assets/**/*.scss'
                ],
                tasks: ['sass:build', 'copy:build']
            },
            js: {
                files: [
                    '<%= config.app %>/app/**/*.js',
                    '<%= config.app %>/components/**/*.js',
                    './server/**/*.js'
                ],
                tasks: ['copy:build']
            }
        },

        // Add new app release
        release: {
            options: {
                npm: false,
                additionalFiles: ['bower.json'],
                indentation: '    ',
                beforeBump: ['lint'],
                github: {
                    repo: 'vinicius0026/abelhas-operarias',
                    usernameVar: 'GITHUB_USERNAME',
                    passwordVar: 'GITHUB_ACCESS_TOKEN'
                }
            }
        }
    });

    /************************************************************************
     * Registered Tasks
     ************************************************************************/


    grunt.registerTask('lint', [
        'jshint',
        'jscs'
    ]);

    grunt.registerTask('e2e', [
        'clean:build',
        'sass:build',
        'html2js:build',
        'wiredep:build',
        'copy:build',
        'connect:test',
        'protractor:e2e'
    ]);

    grunt.registerTask('test:client', [
        'env:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:build',
        'sass:build',
        'html2js:build',
        'wiredep:build',
        'copy:build'
    ]);

    grunt.registerTask('deploy', [
        'clean:prod',
        'lint',
        'env:prod',
        'wiredep:prod',
        'html2js:prod',
        'copy:dist',
        'sass:prod',
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'ngAnnotate',
        'uglify',
        'filerev',
        'usemin',
        'copy:prod',
        'htmlmin',
        'clean:after'
    ]);

    grunt.registerTask('serve', [
        'build',
        'connect:livereload',
        'watch'
    ]);
};
