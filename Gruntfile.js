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
            target: [ 'bin/*.js', 'lib/*.js', 'test/**/*_spec.js' ]
        }
    });
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.registerTask('default', ['eslint']);
    grunt.registerTask('test', ['simplemocha']);
    grunt.registerTask('coverage', 'Run Instanbul code test coverage task', [ 'mocha_istanbul:all' ]);
};