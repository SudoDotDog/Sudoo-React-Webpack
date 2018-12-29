/**
 * @author WMXPY
 * @namespace Webpack
 * @description Production
 */

import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as Path from "path";
import * as Webpack from "webpack";
import { createOptimization } from "./common/optimization";
import { createSassProductionLoader } from "./common/sass.build";
import { createTypescriptLoader } from "./common/ts";
import { SudooWebpackPath } from "./declare";

export const createBuildConfig = (PATHS: SudooWebpackPath) => ({
    target: 'web',
    mode: 'production',
    optimization: createOptimization(),
    entry: {
        index: Path.join(PATHS.APP_DIR, PATHS.APP_ENTRY_FILE_NAME),
    },
    output: {
        filename: "[name].[hash:base64:5].bundle.js",
        path: PATHS.BUILD_DIR,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".css", ".sass"],
    },
    module: {
        rules: [
            createTypescriptLoader(PATHS.TSCONFIG_PATH),
            ...createSassProductionLoader(PATHS.COMMON_SASS_DIR),
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            chunks: ['index'],
            title: 'Brontosaurus',
            template: Path.join(PATHS.PUBLIC_DIR, PATHS.TEMPLATE_FILE_NAME),
            filename: 'index.html',
        }),
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
});
