/**
 * @author WMXPY
 * @namespace Webpack
 * @description Production
 */

import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as Path from "path";
import * as Webpack from "webpack";
import { createDefinePlugin } from "./common/define";
import { createHtmlWebpackPlugin } from "./common/html";
import { createOptimization } from "./common/optimization";
import { createSassProductionLoader } from "./common/sass.build";
import { createTypescriptLoader, getResolves } from "./common/ts";
import { SudooWebpackInternal, SudooWebpackPath, SudooWebpackSetting } from "./declare";

export const createBuildConfig = (PATHS: SudooWebpackPath, setting: SudooWebpackSetting, internal: SudooWebpackInternal): Webpack.Configuration => {

    const plugins: Webpack.Plugin[] = setting.plugins || [];

    return {
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
        ...getResolves(),
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
            createHtmlWebpackPlugin(internal.TEMPLATE_PATH, setting),
            createDefinePlugin('production', setting.defines),
            ...plugins,
        ],
    };
};
