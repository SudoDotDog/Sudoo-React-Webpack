/**
 * @author WMXPY
 * @namespace Webpack
 * @description File
 */

import * as Webpack from "webpack";

export const createFilePlugins = (env: string, defines: Record<string, string> = {}): Webpack.Plugin[] => {

    return [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env),
            ...defines,
        }),
    ];
};
