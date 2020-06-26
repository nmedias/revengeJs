/* eslint-disable @typescript-eslint/no-var-requires */

const merge = require('webpack-merge');
const Webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const common = require('./webpack.common.js');
const config = require('./config.js');

// Shared Prod Configs for both Targets
const shared = {
    mode: 'production',
    devtool: 'source-map',
    stats: 'errors-only',
    bail: true,
    plugins: [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s?css/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js',
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
        ],
    },
    optimization: {
        minimize: true,
    },
};

//Target Lib - Production Config
const formats =
    !config.lib.formats || config.lib.formats.length <= 0
        ? ['umd']
        : typeof config.lib.formats === 'string'
        ? [config.lib.formats]
        : config.lib.formats;

const lib = formats
    .map(format =>
        merge(shared, {
            output: {
                // Capititalize First Letter
                library: [...config.lib.name]
                    .map((char, index) => (index ? char : char.toUpperCase()))
                    .join(''),
                libraryTarget: format,
                libraryExport: 'default',
                globalObject: 'this',
                filename: `[name].${format}.js`,
            },
            externals: config.lib.externals,
            plugins: [
                new MiniCssExtractPlugin({
                    filename: `${config.lib.name}.css`,
                }),
            ],
            module: {
                rules: [
                    {
                        test: /\.ts(x?)$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'awesome-typescript-loader',
                            },
                        ],
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: 'babel-loader',
                    },
                ],
            },
        })
    )
    .map(lib => merge(common.lib, lib));

const libPolyfilled = formats
    .map(format =>
        merge(shared, {
            output: {
                // Capititalize First Letter
                library: [...config.lib.name]
                    .map((char, index) => (index ? char : char.toUpperCase()))
                    .join(''),
                libraryTarget: format,
                libraryExport: 'default',
                globalObject: 'this',
                filename: `[name].${format}.polyfilled.js`,
            },
            externals: config.lib.externals,
            plugins: [
                new MiniCssExtractPlugin({
                    filename: `${config.lib.name}.css`,
                }),
            ],
            module: {
                rules: [
                    {
                        test: /\.ts(x?)$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: 'awesome-typescript-loader',
                                options: {
                                    useBabel: true,
                                    babelCore: '@babel/core',
                                },
                            },
                        ],
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: 'babel-loader',
                    },
                ],
            },
        })
    )
    .map(lib => merge(common.lib, lib));

//Target Demo - Production Config
const demo = merge(shared, {
    output: {
        filename: '[name].bundle.js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/demo.css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            useBabel: true,
                            babelCore: '@babel/core',
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
});

module.exports = [merge(common.demo, demo), ...lib, ...libPolyfilled];
