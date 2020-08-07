/**
 * @author WMXPY
 * @namespace Webpack
 * @description File Loader
 */

import * as SvgToMiniDataURI from "mini-svg-data-uri";
import * as Webpack from "webpack";

export const createUrlLoaders = (): Webpack.RuleSetRule[] => [
    {
        test: /\.(webp|png|jpe?g|gif)$/i,
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
    {
        test: /\.svg$/i,
        use: [
            {
                loader: 'url-loader',
                options: {
                    fallback: 'file-loader',
                    limit: 8192,
                    name: '[contenthash].[ext]',
                    generator: (content: any) => {
                        return SvgToMiniDataURI(content.toString());
                    },
                },
            },
        ],
    },
];
