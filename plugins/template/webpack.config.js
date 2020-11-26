const pluginName = "YOUR-PLUGIN-NAME";   // <- REPLACE WITH YOUR PLUGIN NAME

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

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
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: normalisePluginName(pluginName),
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
        ]),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
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
