import type { Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import merge from 'webpack-merge';
import { getPortHash } from './scripts/get-local-host';

import common from './webpack.common';
import pkg from './package.json';

export default merge(common, <Configuration>{
    mode: 'development', // "production" | "development" | "none"
    // Chosen mode tells webpack to use its built-in optimizations accordingly.
    devtool: 'source-map', // enum
    // enhance debugging by adding meta info for the browser devtools
    // source-map most detailed at the expense of build speed.
    devServer: <DevServerConfiguration>{
        host: 'local-ipv4',
        port: getPortHash(pkg.name),
        open: true,
        hot: true,
        client: {
            overlay: false
        },
        // server: 'https'
    }
});
