/* eslint-disable @typescript-eslint/no-var-requires */
const Path = require('path');
const merge = require('webpack-merge');
const config = require('./config.js');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

// Shared Common Configs for both Targets
const shared = {
    output: {
        filename: '[name].js',
    },
    resolve: {
        alias: {
            '@': config.src,
        },
        extensions: ['.tsx', '.ts', '.js', '.json', '.scss', '.css'],
    },
    plugins: [new CheckerPlugin()],
};

//Target Lib - Common Config
const lib = merge(shared, {
    entry: {
        [config.lib.name]: Path.resolve(
            config.lib.srcPath,
            `./${config.lib.name}`
        ),
        [`${config.lib.name}CSS`]: Path.resolve(
            config.lib.srcPath,
            `./scss/${config.lib.name}.scss`
        ),
    },
    output: {
        path: config.lib.buildPath,
    },
    plugins: [
        new CleanWebpackPlugin({
            //do not automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: false,
            // needed to delete also webpack generated files
            protectWebpackAssets: false,
            //remove unneeded js/map (compiled scss) file after build
            cleanAfterEveryBuildPatterns: [`${config.lib.name}CSS*.*`],
        }),
    ],
});

//Target Demo - Common Config
const demo = merge(shared, {
    entry: {
        demo: Path.resolve(config.demo.srcPath, './demo'),
    },
    output: {
        path: config.demo.buildPath,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: Path.resolve(config.demo.srcPath, './index.html'),
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /.*\.(jpg|png|gif|svg|webp)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            context: Path.resolve(
                                config.demo.srcPath,
                                './images'
                            ),
                            name: '[path][name].[ext]',
                            outputPath: 'images/',
                        },
                    },
                ],
            },
        ],
    },
});

module.exports = { demo, lib };
