import { resolve } from 'path';
import * as webpack from 'webpack';
import { CleanWebpackPlugin }  from 'clean-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
const HtmlWebpackBannerPlugin = require('html-webpack-banner-plugin');
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';

import * as gameConfig from './src/ts/game.config';

// boolean indicating if current build is dev or prod
const prod: boolean = module.parent.id.includes('.prod');

const pkg = require('./package.json');
const banner = '\nCopyright (c) ' + new Date().getFullYear() + ' ' + pkg.author + '\n';

export default <webpack.Configuration>{
    entry: {
        // defaults to ./src
        // Here the application starts executing
        // and webpack starts bundling
        game: resolve(__dirname, 'src', 'ts', 'game.ts') // string | object | array
    },
    output: {
        // options related to how webpack emits results
        filename: `[name]${ prod ? '.[contenthash]' : '' }.js`, // string
        // the filename template for entry chunks
        path: resolve(__dirname, 'dist'), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)
        // publicPath: "/assets/", // string
        // the url to the output directory resolved relative to the HTML page
    },
    optimization: {
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        // configuration regarding modules
        rules: [
            // rules for modules (configure loaders, parser options, etc.)
            {
                test: /\.ts?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.ejs$/,
                loader: 'compile-ejs-loader'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // only enable hot in development
                            hmr: !prod,
                        },
                    },
                    'css-loader'
                ]
            },
            /**
             * Assets
             */
            {
                test: RegExp(resolve(__dirname, 'src', 'assets', '(audio|images)', '.+$')
                    .replace(/\\/g,'\\\\')),
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: `[path][name]${ prod ? '.[contenthash]' : '' }.[ext]`,
                        context: 'src'
                    }
                }]
            },
            {
                test: require.resolve('phaser'),
                use: [{
                    loader: 'expose-loader',
                    options: 'Phaser'
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'], // .js for Phaser imports
        // extensions that are used
    },
    plugins: [
        new webpack.DefinePlugin({
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true),
            'typeof EXPERIMENTAL': JSON.stringify(false),
            'typeof PLUGIN_CAMERA3D': JSON.stringify(false),
            'typeof PLUGIN_FBINSTANT': JSON.stringify(false)
        }),
        new CleanWebpackPlugin(),
        new webpack.BannerPlugin({
            banner: banner,
            entryOnly: true
        }),
        new HtmlWebpackPlugin({
            template: './src/ejs/index.ejs',
            templateParameters: {
                title: gameConfig.title,
                description: gameConfig.description,
                analyticsId: prod ? gameConfig.analyticsId : null
            },
            minify: prod ? {
                removeComments: true,
                collapseWhitespace: true,
                conservativeCollapse: true,
                minifyJS: {
                    compress: false,
                    mangle: false
                }
            } : {}
        }),
        new HtmlWebpackBannerPlugin({
            banner: banner
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            chunkFilename: `style${ prod ? '.[contenthash]' : '' }.css`,
        })
    ]
};
