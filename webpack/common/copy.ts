/**
 * @author WMXPY
 * @namespace Webpack
 * @description Copy
 */

import * as CopyWebpackPlugin from "copy-webpack-plugin";
import * as Webpack from "webpack";
import { CopyPlugInElement } from "../declare";

export const createCopyPlugins = (copies?: CopyPlugInElement[]): Webpack.Plugin[] => {

    if (copies && Array.isArray(copies) && copies.length > 0) {
        return [
            new CopyWebpackPlugin({
                patterns: copies || [],
                options: {
                    concurrency: 100,
                },
            }),
        ];
    }

    return []
};
