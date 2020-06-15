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

    return {
        target: setting.target ?? 'web',
        devtool: 'cheap-module-eval-source-map',
        mode: "development",
        entry: {
            index: [
                'react-hot-loader/patch',
                'webpack-dev-server/client',
                'webpack/hot/only-dev-server',
                Path.join(PATHS.APP_DIR, PATHS.APP_ENTRY_FILE_NAME),
            ],
        },
        output: {
            filename: "[name].bundle.js",
            path: PATHS.BUILD_DIR,
            publicPath: '/',
        },
        ...getStatsSetting(setting),
        ...getResolves(),
        module: {
            rules: [
                createTypescriptLoader(PATHS.TSCONFIG_PATH),
                ...createSassDevelopmentLoader(PATHS.COMMON_SASS_DIR),
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
            createDevlHtmlWebpackPlugin(internal.TEMPLATE_PATH, setting),
            createDefinePlugin('development', setting.defines),
            ...createCopyPlugins(setting.copies),
            ...plugins,
        ],
        ...({
            devServer: {
                hot: true,
                contentBase: PATHS.BUILD_DIR,
                publicPath: '/',
                port,
                inline: true,
                historyApiFallback: true,
            },
        } as any),
    };
};
