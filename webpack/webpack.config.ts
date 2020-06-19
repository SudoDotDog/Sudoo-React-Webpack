/**
 * @author WMXPY
 * @namespace Webpack
 * @description Production
 */

import { LicenseWebpackPlugin } from "license-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as Path from "path";
import * as Webpack from "webpack";
import { createAnalyzers } from "./common/analyze";
import { createCopyPlugins } from "./common/copy";
import { createDefinePlugin } from "./common/define";
import { createHtmlWebpackPlugin } from "./common/html";
import { createOptimization } from "./common/optimization";
import { createSassProductionLoader } from "./common/sass.build";
import { getStatsSetting } from "./common/status";
import { createTypescriptLoader, getResolves } from "./common/ts";
import { SudooWebpackInternal, SudooWebpackPath, SudooWebpackSetting } from "./declare";

export const createBuildConfig = (PATHS: SudooWebpackPath, setting: SudooWebpackSetting, internal: SudooWebpackInternal): Webpack.Configuration => {

    const plugins: Webpack.Plugin[] = setting.plugins || [];
    const buildConfigPath: string = PATHS.TSCONFIG_PATH
        ? PATHS.TSCONFIG_PATH
        : Path.join(__dirname, 'config', 'tsconfig.build.json');

    return {
        target: setting.target ?? 'web',
        mode: 'production',
        optimization: createOptimization(),
        entry: {
            index: Path.join(PATHS.APP_DIR, PATHS.APP_ENTRY_FILE_NAME),
        },
        output: {
            filename: '[name].[contenthash].bundle.js',
            path: PATHS.BUILD_DIR,
            publicPath: '/',
        },
        ...getStatsSetting(setting),
        ...getResolves(),
        module: {
            rules: [
                createTypescriptLoader(buildConfigPath),
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
                filename: "[name].[contenthash].css",
                chunkFilename: "[name].[id].[contenthash].css",
            }),
            new LicenseWebpackPlugin({
                addBanner: true,
                renderBanner: (filename: string) => {
                    return `/*! SEE LICENSE AT ${filename} */`;
                },
                outputFilename: '[name].[id].LICENSE.txt',
            }),
            createHtmlWebpackPlugin(internal.TEMPLATE_PATH, setting),
            createDefinePlugin('production', setting.defines),
            ...createCopyPlugins(setting.copies),
            ...createAnalyzers(setting),
            ...plugins,
        ],
    };
};
