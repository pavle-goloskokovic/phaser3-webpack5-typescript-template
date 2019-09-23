import * as webpack from 'webpack';
import * as merge from 'webpack-merge';

import common from './webpack.common';

export default merge(common, <webpack.Configuration>{
    mode: 'development', // "production" | "development" | "none"
    // Chosen mode tells webpack to use its built-in optimizations accordingly.
    devtool: 'source-map', // enum
    // enhance debugging by adding meta info for the browser devtools
    // source-map most detailed at the expense of build speed.
});
