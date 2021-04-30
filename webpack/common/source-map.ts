/**
 * @author WMXPY
 * @namespace Webpack
 * @description Source Map
 */

import * as Webpack from "webpack";

export const createSourceMapLoader = (skipNodeModulesSourceMapping?: boolean): Webpack.RuleSetRule[] => {

    if (skipNodeModulesSourceMapping) {
        return [
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
                options: {
                    filterSourceMappingUrl: (_url: string, resourcePath: string): boolean => {
                        if (/.*\/node_modules\/.*/.test(resourcePath)) {
                            return false;
                        }
                        return true;
                    }
                }
            }
        ];
    }

    return [
        {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader",
        }
    ];
};
