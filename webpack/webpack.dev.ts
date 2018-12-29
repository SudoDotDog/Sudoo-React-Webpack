/**
 * @author WMXPY
 * @namespace Webpack
 * @description Development
 */

import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as Path from "path";
import * as Webpack from "webpack";

const BUILD_DIR = Path.resolve(__dirname, '..', 'dist');
const APP_DIR = Path.resolve(__dirname, '..', 'src');
const RENDERER_TSCONFIG_DIR = Path.resolve(__dirname, '..', 'typescript', 'tsconfig.dev.json');

const config = {
    devtool: 'cheap-module-eval-source-map',
    target: "web",
    mode: "development",
    entry: {
        index: [
            'react-hot-loader/patch',
            'webpack-dev-server/client',
            'webpack/hot/only-dev-server',
            APP_DIR + "/index.tsx",
        ],
    },
    output: {
        filename: "[name].bundle.js",
        path: BUILD_DIR,
        publicPath: '/',
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".css", ".sass"],
    },
    module: {
        rules: [
            require('./common/ts')(RENDERER_TSCONFIG_DIR),
            ...require('./common/sass.dev'),
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
            template: require('./common/dirs').HTML_TEMPLATE_DIR,
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
        contentBase: Path.resolve(__dirname, 'app', 'renderer'),
        publicPath: '/',
        port: 8083,
        inline: true,
        historyApiFallback: true
    },
};

module.exports = config;