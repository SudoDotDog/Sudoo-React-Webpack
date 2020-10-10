/**
 * @author WMXPY
 * @namespace Webpack
 * @description Production
 */

import { LicenseWebpackPlugin } from "license-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import * as Path from "path";
import * as TerserPlugin from "terser-webpack-plugin";
import * as Webpack from "webpack";
import { createAnalyzers } from "./common/analyze";
import { createCopyPlugins } from "./common/copy";
import { createDefinePlugin } from "./common/define";
import { createUrlLoaders } from "./common/file";
import { createHtmlWebpackPlugin } from "./common/html";
import { createSassProductionLoader } from "./common/sass.build";
import { getStatsSetting } from "./common/status";
import { createTypescriptLoader, getResolves } from "./common/ts";
import { getWebpackTarget, SudooWebpackInternal, SudooWebpackPath, SudooWebpackSetting } from "./declare";

export const createBuildConfig = (
    paths: SudooWebpackPath,
    setting: SudooWebpackSetting,
    internal: SudooWebpackInternal,
): Webpack.Configuration => {

    const plugins: Webpack.WebpackPluginInstance[] = setting.plugins || [];
    const buildConfigPath: string = paths.tsconfigPath
        ? paths.tsconfigPath
        : Path.join(__dirname, 'config', 'tsconfig.build.json');

    return {

        target: getWebpackTarget(setting.target),
        mode: 'production',
        optimization: {
            chunkIds: 'named',
            moduleIds: 'hashed',
            runtimeChunk: 'single',
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
                    core: {
                        test: /[\\/]src[\\/]/,
                        maxInitialRequests: 2,
                        priority: 10,
                        name: 'core',
                        enforce: true,
                        reuseExistingChunk: true,
                    },
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        maxInitialRequests: 9,
                        name: (module: any) => {
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                            return `vendor.${packageName.replace('@', '')}`;
                        },
                        reuseExistingChunk: true,
                    },
                    style: {
                        test: /\.css$/,
                        priority: 10,
                        maxInitialRequests: 2,
                        name: 'style',
                        enforce: true,
                    },
                },
            },
        },
        entry: {
            index: Path.join(paths.applicationPath, paths.applicationEntryFile),
        },
        output: {
            filename: '[name].[contenthash].bundle.js',
            path: paths.buildPath,
            publicPath: '/',
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
