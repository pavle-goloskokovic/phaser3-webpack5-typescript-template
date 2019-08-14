import { resolve, join } from 'path';
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackBannerPlugin = require('html-webpack-banner-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

import webpackCommon, { banner } from "./webpack.common";

import * as appConfig from './src/ts/app.config';

export default {
    mode: 'development',
    entry: webpackCommon.entry,
    optimization: webpackCommon.optimization,
    devtool: 'source-map',
    devServer: {
        contentBase: './dist'
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dist')
    },
    module: webpackCommon.module,
    resolve: webpackCommon.resolve,
    plugins: [
        new webpack.BannerPlugin({
            banner: banner,
            entryOnly: true
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/index.pug',
            templateParameters: {
                title: appConfig.title,
                description: appConfig.description
            },
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                conservativeCollapse: true,
                minifyJS: {
                    compress: false,
                    mangle: false
                }
            }
        }),
        new HtmlWebpackBannerPlugin({
            banner: banner
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        })
    ]
};
