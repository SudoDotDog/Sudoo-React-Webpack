/**
 * @author WMXPY
 * @namespace Webpack
 * @description Sass Loader Production
 */

import * as MiniCssExtractPlugin from "mini-css-extract-plugin";

export const createSassProductionLoader = (COMMON_SASS_DIR: string) => [
    {
        test: /\.s(a|c)ss$/,
        exclude: COMMON_SASS_DIR,
        use: [{
            loader: MiniCssExtractPlugin.loader,
        }, {
            loader: 'typings-for-css-modules-loader',
            options: {
                modules: true,
                namedExport: true,
                camelCase: true,
                minimize: true,
                sass: true,
                localIdentName: "[name]_[local]__[hash:base64:5]",
            },
        }, {
            loader: 'sass-loader',
            options: {
                outputStyle: 'expanded',
            },
        }],
    }, {
        test: /\.s(a|c)ss$/,
        include: COMMON_SASS_DIR,
        use: [{
            loader: 'style-loader',
        }, {
            loader: 'css-loader',
        }, {
            loader: 'sass-loader',
            options: {
                outputStyle: 'expanded',
            },
        }],
    },
];
