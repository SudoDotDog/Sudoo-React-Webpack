/**
 * @author WMXPY
 * @namespace Webpack
 * @description Declare
 */

import * as Webpack from "webpack";

export type SudooWebpackPath = {

    APP_DIR: string;
    BUILD_DIR: string;
    COMMON_SASS_DIR: string;

    TSCONFIG_PATH: string;

    APP_ENTRY_FILE_NAME: string;
};

export type SudooWebpackSetting = {

    title: string;
    plugins?: Webpack.Plugin[],
};

export type SudooWebpackInternal = {

    TEMPLATE_PATH: string;
};
