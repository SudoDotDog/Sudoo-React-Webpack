/**
 * @author WMXPY
 * @namespace Webpack
 * @description Optimization
 */

import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import * as Webpack from "webpack";

export const createOptimization = (): Webpack.Options.Optimization => ({

    minimizer: [
        new TerserPlugin({
            cache: true,
            parallel: true,
        }),
        new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
        cacheGroups: {
            styles: {
                name: 'styles',
                test: /\.css$/,
                chunks: 'all',
                enforce: true,
            },
        },
    },
});
