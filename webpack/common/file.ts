/**
 * @author WMXPY
 * @namespace Webpack
 * @description File Loader
 */

import * as Webpack from "webpack";

export const createFileLoaders = (): Webpack.RuleSetRule[] => [
    {
        test: /\.(webp|svg|png|jpe?g|gif)$/i,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[contenthash].[ext]',
                },
            },
        ],
    },
];
