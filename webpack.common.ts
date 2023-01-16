import { resolve } from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import {description, tagId, title} from './src/ts/game.config';

// boolean indicating if current build is dev or prod
const prod: boolean = module.parent.id.includes('.prod');

const pkg = require('./package.json');
const banner = '\nCopyright (c) ' + new Date().getFullYear() + ' ' + pkg.author + '\n';

export default <webpack.Configuration>{
    entry: {
        // defaults to ./src
        // Here the application starts executing
        // and webpack starts bundling
        game: resolve(__dirname, 'src/ts/game.ts') // string | object | array
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
        clean: true
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: false
    },
    module: {
        // configuration regarding modules
        rules: [
            // rules for modules (configure loaders, parser options, etc.)
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {
                    onlyCompileBundledFiles: true
                },
                exclude: /node_modules/
            },
            {
                test: /\.ejs$/,
                use: {
                    loader: 'ejs-compiled-loader',
                    /*options: {
                        htmlmin: true,
                        htmlminOptions: {
                            removeComments: true
                        }
                    }*/
                }
            },
            {
                test: /\.css$/i,
                use: [
                    prod ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader'
                ],
            },
            /**
             * Fonts
             */
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    outputPath: 'assets/fonts/',
                    publicPath: 'assets/fonts/'
                }
            },
            /**
             * Assets
             */
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    outputPath: 'assets/images/',
                    publicPath: 'assets/images/'
                }
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'], // .js for Phaser imports
        // extensions that are used
        alias: {
            // TODO change to phaser-core.js with next version
            // https://github.com/photonstorm/phaser/pull/6320 (merged)
            'phaser': resolve(__dirname, 'node_modules/phaser/src/phaser-arcade-physics.js')
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true),
            'typeof WEBGL_DEBUG': JSON.stringify(false),
            'typeof FEATURE_SOUND': JSON.stringify(true),
            'typeof PLUGIN_CAMERA3D': JSON.stringify(false),
            'typeof PLUGIN_FBINSTANT': JSON.stringify(false)
        }),
        new webpack.BannerPlugin({
            banner,
            entryOnly: true
        }),
        new HtmlWebpackPlugin({
            template: './src/ejs/index.ejs',
            templateParameters: {
                banner: banner.replace('\n', '\n   '),
                tagId: prod ? tagId : null,
                title,
                description
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
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: `style${ prod ? '.[contenthash]' : '' }.css`,
            chunkFilename: `style${ prod ? '.[contenthash]' : '' }.css`
        })
    ]
};
