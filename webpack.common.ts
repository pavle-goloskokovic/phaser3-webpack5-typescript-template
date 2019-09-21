import { resolve } from 'path';
import * as webpack from 'webpack';
import { CleanWebpackPlugin }  from 'clean-webpack-plugin';

const pkg = require('./package.json');

export const banner = '\nCopyright (c) ' + new Date().getFullYear() + ' ' + pkg.author + '\n';

export default <webpack.Configuration>{
    entry: {
        game: resolve(__dirname, 'src', 'ts', 'game.ts') // string | object | array
    },
    // defaults to ./src
    // Here the application starts executing
    // and webpack starts bundling
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
            /**
             * Assets
             */
            {
                test: RegExp(resolve(__dirname, 'src', 'assets', '(audio|images)', '.+$')
                    .replace(/\\/g,'\\\\')),
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[contenthash].[ext]',
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
        })
    ]
};
