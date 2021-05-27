const path = require('path');

module.exports = [{
    entry: path.resolve(__dirname, 'src/nrlint-worker.js'),
    output: {
        filename: 'nrlint-worker.js',
        path: path.resolve(__dirname, 'resources')
    },
    mode: 'production',
    target: ['webworker']
},{
    entry: path.resolve(__dirname, 'lib/rules/index.js'),
    output: {
        filename: 'nrlint-plugin-rules.js',
        path: path.resolve(__dirname, 'resources'),
        library: {
            name: ['nrlint','rules'],
            type: 'assign-properties'
        }
    },
    mode: 'development',
    devtool: false,
    target: ['webworker']
},{
    entry: path.resolve(__dirname, 'lib/rules/function-eslint/index.js'),
    output: {
        filename: 'nrlint-plugin-rules-function-eslint.js',
        path: path.resolve(__dirname, 'resources'),
        library: {
            name: ['nrlint','rules'],
            type: 'assign-properties'
        }
    },
    resolve: {
        fallback: {
            "assert": path.resolve(__dirname, 'lib/rules/function-eslint/empty.js'),
            "util":   false,
            "path":   false
        }
    },
    mode: 'production',
    target: ['webworker']
}];
