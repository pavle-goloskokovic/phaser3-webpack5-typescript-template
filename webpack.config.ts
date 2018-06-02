import { resolve, join } from "path";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pathToPhaser = join(__dirname, '/node_modules/phaser/');
const phaser = join(pathToPhaser, 'dist/phaser.js');

import * as appConfig  from './src/ts/app.config';

module.exports = {
    entry: resolve(__dirname, 'src', 'ts', 'app.ts'),
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.pug?$/,
                loader: 'pug-loader',
                query: { pretty: true }
            },
            {
                test: /\.styl$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']
            },
            {
                test: /phaser\.js$/,
                loader: 'expose-loader?Phaser'
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            phaser: phaser
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: appConfig.title,
            template: './src/templates/index.pug',
            data: {
                description: appConfig.description
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};
