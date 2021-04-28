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
import { createUrlLoaders } from "./common/file";
import { createHtmlWebpackPlugin } from "./common/html";
import { createOptimization } from "./common/optimization";
import { createSassProductionLoader } from "./common/sass.build";
import { getStatsSetting } from "./common/status";
import { createTypescriptLoader, getResolves } from "./common/ts";
import { getWebpackTarget, SudooWebpackInternal, SudooWebpackPath, SudooWebpackSetting } from "./declare";

export const createBuildConfig = (
    paths: SudooWebpackPath,
    setting: SudooWebpackSetting,
    internal: SudooWebpackInternal,
): Webpack.Configuration => {

    const plugins: any[] = setting.plugins || [];
    const buildConfigPath: string = paths.tsconfigPath
        ? paths.tsconfigPath
        : Path.join(__dirname, 'config', 'tsconfig.build.json');

    return {

        target: getWebpackTarget(setting.target),
        mode: 'production',
        optimization: createOptimization(),
        entry: {
            index: Path.join(paths.applicationPath, paths.applicationEntryFile),
        },
        output: {
            filename: '[name].[contenthash].bundle.js',
            path: paths.buildPath,
            publicPath: paths.productionPublicPath ? paths.productionPublicPath : '/',
        },
        ...getStatsSetting(setting),
        ...getResolves(),
        module: {
            rules: [
                createTypescriptLoader(buildConfigPath),
                ...createUrlLoaders(),
                ...createSassProductionLoader(paths.commonSassPath),
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
            createHtmlWebpackPlugin(internal.templatePath, setting),
            createDefinePlugin('production', setting.defines),
            ...createCopyPlugins(setting.copies),
            ...createAnalyzers(setting),
            ...plugins,
        ],
    };
};
