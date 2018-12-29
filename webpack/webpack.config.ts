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
import { SudooWebpackInternal, SudooWebpackPath, SudooWebpackSetting } from "./declare";

export const createBuildConfig = (PATHS: SudooWebpackPath, setting: SudooWebpackSetting, internal: SudooWebpackInternal): Webpack.Configuration => ({

    target: 'web',
    mode: 'production',
    optimization: createOptimization(),
    entry: {
        index: Path.join(PATHS.APP_DIR, PATHS.APP_ENTRY_FILE_NAME),
    },
    output: {
        filename: "[name].[chunkhash].bundle.js",
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
            chunkFilename: "[id].css",
        }),
        new HtmlWebpackPlugin({
            chunks: ['index'],
            title: setting.title,
            template: internal.TEMPLATE_PATH,
            filename: 'index.html',
        }),
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
    ],
});
