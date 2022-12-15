import webpack from 'webpack';
import merge from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

import common from './webpack.common';

export default merge(common, <webpack.Configuration>{
    mode: 'production', // "production" | "development" | "none"
    // Chosen mode tells webpack to use its built-in optimizations accordingly.
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing
            // minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // '...',
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        passes: 2, // default: https://github.com/webpack/webpack/blob/9fcaa243573005d6fdece9a3f8d89a0e8b399613/lib/config/defaults.js#L1168
                        drop_console: true
                    },
                    format: {
                        // custom, for removing comments
                        comments: /^\**!/i
                    }
                },
                extractComments: false
            }),
            new CssMinimizerPlugin()
        ],
    },
    plugins: [
        // list of additional plugins
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});
