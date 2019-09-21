import { resolve } from 'path';
import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import * as HtmlWebpackPlugin from "html-webpack-plugin";
const HtmlWebpackBannerPlugin = require('html-webpack-banner-plugin');
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import ImageminPlugin from 'imagemin-webpack-plugin';

import common, { banner } from './webpack.common';
import * as gameConfig from './src/ts/game.config';

export default merge(common, <webpack.Configuration>{
    mode: 'production', // "production" | "development" | "none"
    // Chosen mode tells webpack to use its built-in optimizations accordingly.
    output: {
        // options related to how webpack emits results
        filename: '[name].[contenthash].js', // string
        // the filename template for entry chunks
        path: resolve(__dirname, 'dist'), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)
        // publicPath: "/assets/", // string
        // the url to the output directory resolved relative to the HTML page
    },
    module: {
        // configuration regarding modules
        rules: [
            // rules for modules (configure loaders, parser options, etc.)
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        // list of additional plugins
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new HtmlWebpackPlugin({
            template: './src/ejs/index.ejs',
            templateParameters: {
                title: gameConfig.title,
                description: gameConfig.description,
                analyticsId: gameConfig.analyticsId
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
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            chunkFilename: 'style.[contenthash].css',
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            }
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
});
