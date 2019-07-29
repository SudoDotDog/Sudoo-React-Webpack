/**
 * @author WMXPY
 * @namespace Webpack
 * @description Copy
 */

import * as CopyWebpackPlugin from "copy-webpack-plugin";
import * as Webpack from "webpack";
import { CopyPlugInElement } from "../declare";

export const createCopyPlugin = (copies?: CopyPlugInElement[]): Webpack.Plugin => {

    return new CopyWebpackPlugin(copies || []);
};
