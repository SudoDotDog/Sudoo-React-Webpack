/**
 * @author WMXPY
 * @namespace Webpack
 * @description Analyze
 */

import * as Webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { SudooWebpackSetting } from "../declare";

export const createAnalyzers = (setting: SudooWebpackSetting): Webpack.Plugin[] => {

    if (setting.analyze) {
        return [new BundleAnalyzerPlugin()];
    }
    return [];
};
