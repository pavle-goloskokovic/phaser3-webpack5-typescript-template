import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import * as OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import ImageminPlugin from 'imagemin-webpack-plugin';

import common from './webpack.common';

export default merge(common, <webpack.Configuration>{
    mode: 'production', // "production" | "development" | "none"
    // Chosen mode tells webpack to use its built-in optimizations accordingly.
    plugins: [
        // list of additional plugins
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
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
