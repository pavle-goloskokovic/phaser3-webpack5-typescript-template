import webpack from 'webpack';
import merge from 'webpack-merge';
import { getLocalHost, getPortHash } from './scripts/get-local-host';

import common from './webpack.common';
import pkg from './package.json';

export default merge(common, <webpack.Configuration>{
    mode: 'development', // "production" | "development" | "none"
    // Chosen mode tells webpack to use its built-in optimizations accordingly.
    devtool: 'source-map', // enum
    // enhance debugging by adding meta info for the browser devtools
    // source-map most detailed at the expense of build speed.
    devServer: {
        host: getLocalHost(),
        port: getPortHash(pkg.name),
        open: true,
    }
});
