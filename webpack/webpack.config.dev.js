/* eslint-disable @typescript-eslint/no-var-requires */
const Webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const config = require('./config.js');

const shared = {
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    plugins: [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/i,
                use: [
                    'style-loader',
                    'css-loader?sourceMap=true',
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
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                    },
                ],
            },
        ],
    },
};

const lib = merge(shared, {
    module: {
        rules: [
            {
                test: /\.js$/,
                include: config.src,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                },
            },
        ],
    },
});

const demo = merge(shared, {
    output: {
        publicPath: '/',
    },
    devServer: {
        open: true,
        inline: true,
        hot: true,
    },
});

const dev = {
    lib,
    demo,
};

module.exports = merge.multiple(common, dev);
