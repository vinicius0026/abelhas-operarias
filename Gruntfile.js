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
                }]
            }
        }
    });

    grunt.registerTask('build', ['clean:build', 'copy:build']);
};
