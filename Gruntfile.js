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
        nyc: {
            options: {
                reporter: ['lcov', 'html', 'text-summary'],
                reportDir: 'coverage',
                all: true
            },
            all: {
                cmd: false,
                args: [ 'grunt', 'simplemocha:all' ]
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
    grunt.loadNpmTasks('grunt-simple-nyc');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.registerTask('default', ['eslint']);
    grunt.registerTask('test', ['simplemocha']);
    grunt.registerTask('coverage', 'Run Instanbul code test coverage task', [ 'nyc:all' ]);
};