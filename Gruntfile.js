
module.exports = function(grunt) {
    grunt.initConfig({
        simplemocha: {
            options: {
                timeout: 10000
            },
            all: {
                src: [
                    'test/**/*_spec.js',
                    'packages/node_modules/nrlint-main/test/**/*_spec.js',
                    'packages/node_modules/nrlint-plugin-core/test/**/*_spec.js',
                    'packages/node_modules/nrlint-plugin-func-style-eslint/test/**/*_spec.js'
                ]
            }
        },
        nyc: {
            options: {
                cwd: '.',
                include: [
                    'packages/node_modules/nrlint-main/bin/*.js',
                    'packages/node_modules/nrlint-main/lib/**/*.js',
                    'packages/node_modules/nrlint-plugin-core/cli/*.js',
                    'packages/node_modules/nrlint-plugin-func-style-eslint/cli/*.js',
                ],
                excludeNodeModules: false,
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
            target: [
                'test/**/*_spec.js',
                'packages/node_modules/*/bin/**/*.js',
                'packages/node_modules/*/lib/**/*.js',
                'packages/node_modules/*/cli/**/*.js',
                'packages/node_modules/*/test/**/*_spec.js'
            ]
        },
        jsdoc: {
            dist: {
                src: [
                    'packages/node_modules/nrlint-main/lib/**/*.js'
                ],
                options: {
                    destination: 'doc',
                }
            }
        },
        'npm-command': {
            'func-style-eslint': {
                options: {
                    cwd: 'packages/node_modules/nrlint-plugin-func-style-eslint/'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-simple-nyc');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-npm-command');
    grunt.registerTask('default', ['eslint','npm-command','nyc:all']);
    grunt.registerTask('test', ['simplemocha:all']);
    grunt.registerTask('doc', ['jsdoc']);
    grunt.registerTask('coverage', ['nyc:all'])
};