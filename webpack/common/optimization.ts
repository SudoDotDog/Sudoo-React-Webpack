/**
 * @author WMXPY
 * @namespace Webpack
 * @description Optimization
 */

import * as OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import * as TerserPlugin from "terser-webpack-plugin";
import * as Webpack from "webpack";

export const createOptimization = (): Webpack.Options.Optimization => ({

    runtimeChunk: 'multiple',
    minimizer: [
        new TerserPlugin({
            cache: true,
            parallel: true,
        }),
        new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
        chunks: 'all',
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
