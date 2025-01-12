import { resolve } from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import type autoprefixer from 'autoprefixer';
import HTMLInlineCSSWebpackPlugin from 'html-inline-css-webpack-plugin';

import { description, tagId, title } from './src/ts/game.config';
import pkg from './package.json';

// boolean indicating if current build is dev or prod
const prod: boolean = module.parent.id.includes('.prod');

const banner = '\nCopyright (c) ' + new Date().getFullYear() + ' ' + pkg.author + '\n';

const htmlminOptions = {
    removeComments: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    minifyJS: {
        compress: false,
        mangle: false
    },
    minifyCSS: true
} as HtmlWebpackPlugin.MinifyOptions;

const assetsRule = (
    test: webpack.RuleSetRule['test'],
    folderName: 'images' | 'fonts' | 'audio'
): webpack.RuleSetRule =>
{
    return {
        test,
        type: 'asset/resource',
        generator: {
            filename: `assets/${folderName}/[name]${
                prod ? '.[contenthash]' : ''
            }[ext][query]`
        }
    };
};

export default <webpack.Configuration>{
    entry: {
        // defaults to ./src
        // Here the application starts executing
        // and webpack starts bundling
        game: resolve(__dirname, 'src/ts/game.ts') // string | object | array
    },
    target: ['web', 'es5'],
    output: {
        // options related to how webpack emits results
        filename: `[name]${ prod ? '.[contenthash]' : '' }.js`, // string
        // the filename template for entry chunks
        // TODO never set path to root as it will delete the whole project on next build
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
                    options: {
                        htmlmin: prod,
                        htmlminOptions
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [
                    prod ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: { postcssOptions: { plugins: [[
                            'autoprefixer',
                            <autoprefixer.Options> {
                                // Options
                                overrideBrowserslist: [
                                    '>0.2%, last 4 versions'
                                ]
                            }
                        ]] } }
                    }
                ]
            },
            /**
             * Fonts
             */
            assetsRule(/\.(woff|woff2|eot|ttf|otf)$/i, 'fonts'),
            assetsRule(/assets\\fonts\\.+\.xml$/i, 'fonts'),
            /**
             * Images
             */
            assetsRule(/\.(png|webp|svg|jpg|jpeg|gif)$/i, 'images'),
            /**
             * Audio
             */
            assetsRule(/\.(mp3|ogg)$/i, 'audio')
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'], // .js for Phaser imports
        // extensions that are used
        alias: {
            'phaser': resolve(__dirname,
                // 'node_modules/phaser/src/phaser-core.js'
                // `src/js/phaser-custom${ prod ? '.min' : '' }.js`
                `node_modules/phaser/dist/phaser-arcade-physics${ prod ? '.min' : '' }.js`
            )
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
            entryOnly: true,
            exclude: /\.css$/
        }),
        new HtmlWebpackPlugin({
            template: './src/ejs/index.ejs',
            templateParameters: {
                banner: `\n${banner.replace('\n', '\n   ')}\n`,
                tagId: prod ? tagId : null,
                title,
                description
            },
            inject: 'body',
            minify: prod ? htmlminOptions : 'auto'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: `style${ prod ? '.[contenthash]' : '' }.css`,
            chunkFilename: `style${ prod ? '.[contenthash]' : '' }.css`
        }),
        new HTMLInlineCSSWebpackPlugin({
            styleTagFactory ({ style })
            {
                return `<style>${style}</style>`;
            }
        })
    ]
};
