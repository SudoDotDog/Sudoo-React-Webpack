/**
 * @author WMXPY
 * @namespace Webpack
 * @description Sass Loader Development
 */

import * as Webpack from "webpack";

export const createSassDevelopmentLoader = (COMMON_SASS_DIR: string): Webpack.RuleSetRule[] => [
    {
        test: /\.s(a|c)ss$/,
        exclude: COMMON_SASS_DIR,
        use: [{
            loader: 'style-loader',
        }, {
            loader: 'typings-for-css-modules-loader',
            options: {
                modules: true,
                namedExport: true,
                camelCase: true,
                sass: true,
                localIdentName: "[name]_[local]__[hash:base64:5]",
            },
        }, {
            loader: 'sass-loader',
            options: {
                outputStyle: 'expanded',
                sourceMap: true,
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
                sourceMap: true,
            },
        }],
    }, {
        test: /\.css$/,
        use: [{
            loader: 'style-loader',
        }, {
            loader: 'css-loader',
        }],
    },
];
