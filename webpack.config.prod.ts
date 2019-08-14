import { resolve } from 'path';
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackBannerPlugin = require('html-webpack-banner-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

import webpackCommon, { banner } from './webpack.common';
import * as appConfig from './src/ts/app.config';

export default {
    mode: 'production',
    entry: webpackCommon.entry,
    optimization: webpackCommon.optimization,
    output: {
        filename: '[chunkhash].[name].js',
        path: resolve(__dirname, 'dist')
    },
    module: webpackCommon.module,
    resolve: webpackCommon.resolve,
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': <any>JSON.stringify('production')
        }),
        new CleanWebpackPlugin(),
        new webpack.BannerPlugin({
            banner: banner,
            entryOnly: true
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/index.pug',
            templateParameters: {
                title: appConfig.title,
                description: appConfig.description,
                analyticsId: appConfig.analyticsId
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
            filename: '[hash].[name].css',
            chunkFilename: '[hash].[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new ImageminPlugin({ // Make sure that the plugin is after any plugins that add images
            test: /\.(jpe?g|png|gif|svg)$/i,
            optipng: {
                optimizationLevel: 7,
            },
            pngquant: {
                quality: '65-90',
                speed: 4,
            },
            jpegtran: {
                progressive: true
            }
        })
    ]
}
