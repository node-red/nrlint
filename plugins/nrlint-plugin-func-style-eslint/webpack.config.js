const path = require('path');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function normalisePluginName(name) {
    name = "nrlint-" + name;
    var result = name.replace(/[^a-zA-Z0-9]/g, " ");
    result = result.trim();
    result = result.replace(/ +/g, " ");
    result = result.replace(/ ./g,
        function (s) {
            return s.charAt(1).toUpperCase();
        }
    );
    result = result.charAt(0).toLowerCase() + result.slice(1);
    return result;
}

module.exports = {
    entry: './src/rule.js',
    output: {
        filename: 'temp.js',
        path: path.resolve(__dirname, 'dist'),
        library: normalisePluginName('func-style-eslint'),
        libraryTarget: 'var'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/plugin.html',
            inlineSource: '.js$',
            filename: 'plugin.html',
            minify: true
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new CopyWebpackPlugin([
            { from: 'src/plugin.js' }
        ]),
    ],
    mode: 'production'
};
