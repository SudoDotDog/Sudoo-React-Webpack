/**
 * @author WMXPY
 * @namespace Webpack
 * @description Development
 */

import * as Path from "path";
import * as Webpack from "webpack";
import { createCopyPlugins } from "./common/copy";
import { createDefinePlugin } from "./common/define";
import { createDevlHtmlWebpackPlugin } from "./common/html-devl";
import { createSassDevelopmentLoader } from "./common/sass.dev";
import { getStatsSetting } from "./common/status";
import { createTypescriptLoader, getResolves } from "./common/ts";
import { SudooWebpackInternal, SudooWebpackPath, SudooWebpackSetting } from "./declare";
import { getWebpackTarget } from "./util";

export const createDevConfig = (
    paths: SudooWebpackPath,
    setting: SudooWebpackSetting,
    internal: SudooWebpackInternal,
    port: number,
): Webpack.Configuration => {

    const plugins: Webpack.Plugin[] = setting.plugins || [];
    const devConfigPath: string = paths.tsconfigPath
        ? paths.tsconfigPath
        : Path.join(__dirname, 'config', 'tsconfig.dev.json');

    return {

        target: getWebpackTarget(setting),
        devtool: 'cheap-module-eval-source-map',
        mode: "development",
        entry: {
            index: [
                'react-hot-loader/patch',
                'webpack-dev-server/client',
                'webpack/hot/only-dev-server',
                Path.join(paths.applicationPath, paths.applicationEntryFile),
            ],
        },
        output: {
            filename: "[name].bundle.js",
            path: paths.buildPath,
            publicPath: '/',
        },
        ...getStatsSetting(setting),
        ...getResolves(),
        module: {
            rules: [
                createTypescriptLoader(devConfigPath),
                ...createSassDevelopmentLoader(paths.commonSassPath),
                {
                    enforce: "pre",
                    test: /\.js$/,
                    loader: "source-map-loader",
                },
            ],
        },
        plugins: [
            new Webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
            new Webpack.LoaderOptionsPlugin({
                debug: true,
            }),
            new Webpack.HotModuleReplacementPlugin(),
            new Webpack.NamedModulesPlugin(),
            createDevlHtmlWebpackPlugin(internal.templatePath, setting),
            createDefinePlugin('development', setting.defines),
            ...createCopyPlugins(setting.copies),
            ...plugins,
        ],
        ...({
            devServer: {
                hot: true,
                contentBase: paths.buildPath,
                publicPath: '/',
                port,
                inline: true,
                historyApiFallback: true,
            },
        } as any),
    };
};
