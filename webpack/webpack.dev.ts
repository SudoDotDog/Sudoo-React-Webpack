/**
 * @author WMXPY
 * @namespace Webpack
 * @description Development
 */

import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as Path from "path";
import * as Webpack from "webpack";
import { createSassDevelopmentLoader } from "./common/sass.dev";
import { createTypescriptLoader } from "./common/ts";
import { SudooWebpackPath } from "./declare";

export const createDevConfig = (PATHS: SudooWebpackPath) => ({
    devtool: 'cheap-module-eval-source-map',
    target: "web",
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
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".css", ".sass"],
    },
    module: {
        rules: [
            createTypescriptLoader(PATHS.TSCONFIG_PATH),
            ...createSassDevelopmentLoader(PATHS.COMMON_SASS_DIR),
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
        ]
    },
    plugins: [
        new Webpack.WatchIgnorePlugin([/css\.d\.ts$/]),
        new HtmlWebpackPlugin({
            chunks: ['index'],
            title: 'Brontosaurus',
            template: Path.join(PATHS.PUBLIC_DIR, PATHS.TEMPLATE_FILE_NAME),
            filename: 'index.html',
        }),
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        new Webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NamedModulesPlugin(),
    ],
    devServer: {
        hot: true,
        contentBase: PATHS.BUILD_DIR,
        publicPath: '/',
        port: 8083,
        inline: true,
        historyApiFallback: true
    },
});
