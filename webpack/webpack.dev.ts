/**
 * @author WMXPY
 * @namespace Webpack
 * @description Development
 */

import * as Path from "path";
import * as Webpack from "webpack";
import { createCopyPlugins } from "./common/copy";
import { createDefinePlugin } from "./common/define";
import { createUrlLoaders } from "./common/file";
import { createDevlHtmlWebpackPlugin } from "./common/html-devl";
import { createSassDevelopmentLoader } from "./common/sass.dev";
import { createSourceMapLoader } from "./common/source-map";
import { getStatsSetting } from "./common/status";
import { createTypescriptLoader, getResolves } from "./common/ts";
import { getWebpackTarget, SudooWebpackInternal, SudooWebpackPath, SudooWebpackSetting } from "./declare";

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

        target: getWebpackTarget(setting.target),
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
            publicPath: paths.developmentPublicPath ? paths.developmentPublicPath : '/',
        },
        ...getStatsSetting(setting),
        ...getResolves(),
        module: {
            rules: [
                createTypescriptLoader(devConfigPath),
                ...createUrlLoaders(),
                ...createSassDevelopmentLoader(paths.commonSassPath),
                ...createSourceMapLoader(setting.skipNodeModulesSourceMapping),
            ],
        },
        plugins: [
            new Webpack.WatchIgnorePlugin([
                /(c|sa|sc)ss\.d\.ts$/,
            ]),
            new Webpack.LoaderOptionsPlugin({
                debug: true,
            }),
            new Webpack.NamedModulesPlugin(),
            new Webpack.HotModuleReplacementPlugin(),
            createDevlHtmlWebpackPlugin(internal.templatePath, setting),
            createDefinePlugin('development', setting.defines),
            ...createCopyPlugins(setting.copies),
            ...plugins,
        ],
        ...({
            devServer: {
                hot: true,
                port,
                historyApiFallback: true,
            },
        } as any),
    };
};
