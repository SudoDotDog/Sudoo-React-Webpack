/**
 * @author WMXPY
 * @namespace Webpack
 * @description File Loader
 */

import * as Webpack from "webpack";

export const createUrlLoaders = (): Webpack.RuleSetRule[] => [
    {
        test: /\.(webp|svg|png|jpe?g|gif)$/i,
        use: [
            {
                loader: 'url-loader',
                options: {
                    fallback: 'file-loader',
                    limit: 8192,
                    name: '[contenthash].[ext]',
                },
            },
        ],
    },
];
