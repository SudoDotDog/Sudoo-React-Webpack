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

export const createDevConfig = (PATHS: SudooWebpackPath, setting: SudooWebpackSetting, internal: SudooWebpackInternal, port: number): Webpack.Configuration => {

    const plugins: Webpack.Plugin[] = setting.plugins || [];
    const devConfigPath: string = PATHS.tsconfigPath
        ? PATHS.tsconfigPath
        : Path.join(__dirname, 'config', 'tsconfig.dev.json');

    return {
        target: setting.target ?? 'web',
        devtool: 'cheap-module-eval-source-map',
        mode: "development",
        entry: {
            index: [
                'react-hot-loader/patch',
                'webpack-dev-server/client',
                'webpack/hot/only-dev-server',
                Path.join(PATHS.applicationPath, PATHS.applicationEntryFile),
            ],
        },
        output: {
            filename: "[name].bundle.js",
            path: PATHS.buildPath,
            publicPath: '/',
        },
        ...getStatsSetting(setting),
        ...getResolves(),
        module: {
            rules: [
                createTypescriptLoader(devConfigPath),
                ...createSassDevelopmentLoader(PATHS.commonSassPath),
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
                contentBase: PATHS.buildPath,
                publicPath: '/',
                port,
                inline: true,
                historyApiFallback: true,
            },
        } as any),
    };
};
