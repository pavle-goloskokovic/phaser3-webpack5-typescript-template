import { resolve } from "path";
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

import devConfig from './webpack.config';
import { banner } from "./webpack.config";
import * as appConfig from "./src/ts/app.config";

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
        new webpack.BannerPlugin({
            banner: banner,
            entryOnly: true
        }),
        new HtmlWebpackPlugin({
            title: appConfig.title,
            template: './src/templates/index.pug',
            data: {
                description: appConfig.description,
                banner: banner,
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
        new MiniCssExtractPlugin({
            filename: "[hash].[name].css",
            chunkFilename: "[hash].[id].css"
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
