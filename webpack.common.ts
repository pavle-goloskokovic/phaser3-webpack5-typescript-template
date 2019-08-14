import { join, resolve } from "path";

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pathToPhaser = join(__dirname, '/node_modules/phaser/');
const phaser = join(pathToPhaser, 'dist/phaser.js');

const pkg = require('./package.json');

export const banner = '\nCopyright (c) ' + new Date().getFullYear() + ' ' + pkg.author + '\n';

export default {
    entry: resolve(__dirname, 'src', 'ts', 'app.ts'),
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.pug?$/,
                loader: 'pug-loader',
                query: { pretty: true }
            },
            {
                test: /\.styl$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            // publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('cssnano')()
                            ]
                        }
                    },
                    'stylus-loader'
                ]
            },
            /**
             * Assets
             */
            {
                test: RegExp(join(__dirname, 'src', 'assets', '(audio|images)', '.+$')
                    .replace(/\\/g,'\\\\')),
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][hash].[name].[ext]',
                        context: 'src'
                    }
                }]
            },
            {
                test: /phaser\.js$/,
                loader: 'expose-loader?Phaser'
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.styl'],
        alias: {
            phaser: phaser
        }
    }
};
