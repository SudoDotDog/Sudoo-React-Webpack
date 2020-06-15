/**
 * @author WMXPY
 * @namespace Webpack
 * @description Declare
 */

import * as Webpack from "webpack";

export type SudooWebpackPath = {

    readonly APP_DIR: string;
    readonly BUILD_DIR: string;
    readonly COMMON_SASS_DIR: string;

    readonly TSCONFIG_PATH: string;

    readonly APP_ENTRY_FILE_NAME: string;
};

export type CopyPlugInElement = {

    readonly from: string;
    readonly to: string;
    readonly test?: RegExp;
    readonly cache?: boolean;
};

export type SudooWebpackSetting = {

    readonly title: string;
    readonly target?: 'web'
    | 'webworker'
    | 'node'
    | 'async-node'
    | 'node-webkit'
    | 'atom'
    | 'electron'
    | 'electron-renderer'
    | 'electron-preload'
    | 'electron-main';

    readonly silent?: boolean;
    readonly analyze?: boolean;

    readonly favicon?: string;
    readonly faviconType?: string;
    readonly mobile?: boolean;
    readonly insertion?: string;

    readonly template?: string;
    readonly defines?: Record<string, string>;
    readonly copies?: CopyPlugInElement[];
    readonly plugins?: Webpack.Plugin[],
};

export type SudooWebpackInternal = {

    readonly TEMPLATE_PATH: string;
};
