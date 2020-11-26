const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

function normalisePluginName(name) {
    const result = ("nrlint-"+name)
        .replace(/[^a-zA-Z0-9]/g, " ")
        .trim()
        .replace(/ +/g, " ")
        .replace(/ ./g, s => s.charAt(1).toUpperCase());
    return result.charAt(0).toLowerCase() + result.slice(1);
}

module.exports = {
    entry: './src/rule.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: normalisePluginName('core'),
        libraryTarget: 'var'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'plugin.html',
            templateContent: ''
        }),
        new ScriptExtHtmlWebpackPlugin({
            inline: 'bundle.js'
        }),
        new CopyWebpackPlugin([
            { from: 'src/plugin.js' }
        ])
    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    mode: 'development'
};