/**
 * @author WMXPY
 * @namespace Webpack
 * @description HTML
 */

import * as HtmlWebpackPlugin from "html-webpack-plugin";

export const createHtmlWebpackPlugin = (template: string, settings: Record<string, string>) => {

    return new HtmlWebpackPlugin({
        chunks: ['index'],
        template,
        filename: 'index.html',
        ...settings,
    });
};
