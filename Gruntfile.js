'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        clean: {
            build: {
                src: ['client/build']
            }
        },

        copy: {
            build: {
                files: [{
                    expand: true,
                    cwd: './client',
                    src: 'index.html',
                    dest: './client/build/'
                }, {
                    expand: true,
                    cwd: './client',
                    src: ['app/**/*', 'bower_components/**/*', 'assets/**/*'],
                    dest: './client/build/'
                }]
            }
        }
    });

    grunt.registerTask('build', ['clean:build', 'copy:build']);
};
