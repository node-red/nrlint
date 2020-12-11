module.exports = function(grunt) {
    grunt.initConfig({
        simplemocha: {
            options: {
                timeout: 10000
            },
            all: {
                src: [ 'test/**/*_spec.js' ]
            }
        },
        mocha_istanbul: {
            options: {
                timeout: 10000
            }, 
            all: {
                src: [ 'test/**/*_spec.js' ]
            }
        },
        eslint: {
            target: [ 'bin/**/*.js', 'lib/**/*.js', 'test/**/*_spec.js' ]
        },
        jsdoc: {
            dist: {
                src: [ 'bin/**/*.js', 'lib/**/*.js' ],
                options: {
                    destination: 'doc',
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.registerTask('default', ['eslint']);
    grunt.registerTask('test', ['simplemocha']);
    grunt.registerTask('coverage', 'Run Instanbul code test coverage task', [ 'mocha_istanbul:all' ]);
};