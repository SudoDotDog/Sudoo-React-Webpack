/**
 * @author WMXPY
 * @namespace Webpack
 * @description HTML
 */

import * as HtmlWebpackPlugin from "html-webpack-plugin";
import { SudooWebpackSetting } from "../declare";

export const parseSettingForHtmlPlugin = (setting: SudooWebpackSetting): Record<string, string> => {

    return {
        title: setting.title,
        viewport: setting.mobile
            ? `width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0`
            : `width=device-width, initial-scale=1.0"`,
        insertion: setting.insertion || '',
    };
};

export const createHtmlWebpackPlugin = (template: string, setting: SudooWebpackSetting) => {

    const parsed: Record<string, string> = parseSettingForHtmlPlugin(setting);

    return new HtmlWebpackPlugin({
        chunks: ['index'],
        template,
        filename: 'index.html',
        ...parsed,
    });
};
