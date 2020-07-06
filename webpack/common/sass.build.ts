/**
 * @author WMXPY
 * @namespace Webpack
 * @description Sass Loader Production
 */

import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as Webpack from "webpack";

export const createSassProductionLoader = (COMMON_SASS_DIR: string): Webpack.RuleSetRule[] => [
    {
        test: /\.s(a|c)ss$/,
        exclude: COMMON_SASS_DIR,
        use: [{
            loader: MiniCssExtractPlugin.loader,
        }, {
            loader: '@teamsupercell/typings-for-css-modules-loader',
            options: {
                banner: '// auto-generated - @sudoo/webpack-react',
                disableLocalsExport: true,
                verifyOnly: process.env.NODE_ENV === 'production',
            },
        }, {
            loader: "css-loader",
            options: {
                modules: true,
            },
        }, {
            loader: 'sass-loader',
            options: {
                sassOptions: {
                    outputStyle: 'expanded',
                    sourceMap: false,
                },
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
                sassOptions: {
                    outputStyle: 'expanded',
                    sourceMap: false,
                },
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
