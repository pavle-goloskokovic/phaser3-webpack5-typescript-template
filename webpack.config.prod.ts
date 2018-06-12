import { resolve } from 'path';
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackBannerPlugin = require('html-webpack-banner-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

import devConfig from './webpack.config';
import { banner } from './webpack.config';
import * as appConfig from './src/ts/app.config';

export default {
    entry: devConfig.entry,
    optimization: devConfig.optimization,
    output: {
        filename: '[chunkhash].[name].js',
        path: resolve(__dirname, 'dist')
    },
    module: devConfig.module,
    resolve: devConfig.resolve,
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CleanWebpackPlugin([
            'dist'
        ]),
        new webpack.BannerPlugin({
            banner: banner,
            entryOnly: true
        }),
        new HtmlWebpackPlugin({
            title: appConfig.title,
            template: './src/templates/index.pug',
            data: {
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
            chunkFilename: '[hash].[id].css'
        }),
        new CopyWebpackPlugin([{
            from: 'assets',
            to: 'assets'
        }]),
        new ImageminPlugin({ // Make sure that the plugin is after any plugins that add images
            test: /\.png$/i,
            optipng: {
                optimizationLevel: 7,
            },
            pngquant: {
                quality: '65-90',
                speed: 4,
            }
        })
    ]
}
