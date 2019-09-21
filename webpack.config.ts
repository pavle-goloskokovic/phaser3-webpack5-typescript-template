import { resolve } from 'path';
import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
const HtmlWebpackBannerPlugin = require('html-webpack-banner-plugin');
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

import common, { banner } from './webpack.common';

import * as gameConfig from './src/ts/game.config';

export default merge(common, <webpack.Configuration>{
    mode: 'development', // "production" | "development" | "none"
    // Chosen mode tells webpack to use its built-in optimizations accordingly.
    devtool: 'source-map', // enum
    // enhance debugging by adding meta info for the browser devtools
    // source-map most detailed at the expense of build speed.
    output: {
        // options related to how webpack emits results
        filename: '[name].js', // string
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // only enable hot in development
                            hmr: true,
                        },
                    },
                    'css-loader'
                ]
            }
        ]
    },

    plugins: [
        // list of additional plugins
        new HtmlWebpackPlugin({
            template: './src/ejs/index.ejs',
            templateParameters: {
                title: gameConfig.title,
                description: gameConfig.description
            }
        }),
        new HtmlWebpackBannerPlugin({
            banner: banner
        }),
        new MiniCssExtractPlugin({
            chunkFilename: 'style.css'
        })
    ]
});
