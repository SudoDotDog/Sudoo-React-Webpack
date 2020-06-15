/**
 * @author WMXPY
 * @namespace Webpack
 * @description Define
 */

import { DefinePlugin } from "webpack";

export const createDefinePlugin = (env: string, defines: Record<string, string> = {}): DefinePlugin => {

    return new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env),
        ...defines,
    });
};
