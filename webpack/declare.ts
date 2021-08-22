/**
 * @author WMXPY
 * @namespace Webpack
 * @description Declare
 */

export type SudooWebpackPath = {

    readonly applicationPath: string;
    readonly applicationEntryFile: string;

    readonly buildPath: string;

    readonly commonSassPath?: string;
    readonly developmentPublicPath?: string;
    readonly productionPublicPath?: string;
    readonly tsconfigPath?: string;
};

export type SudooWebpackInternal = {

    readonly templatePath: string;
};

export type CopyPlugInElement = {

    readonly from: string;
    readonly to: string;
    readonly context?: string;
    readonly test?: RegExp;
    readonly cache?: boolean;
};

export type WebpackTarget =
    | 'web'
    | 'webworker'
    | 'node'
    | 'async-node'
    | 'node-webkit'
    | 'atom'
    | 'electron'
    | 'electron-renderer'
    | 'electron-preload'
    | 'electron-main';

export type AvailableWebpackTarget =
    | 'web'
    | 'electron-renderer';

export type SudooWebpackSetting = {

    readonly title: string;

    readonly target?: AvailableWebpackTarget;

    readonly silent?: boolean;
    readonly warningsFilter?: string | RegExp | Array<string | RegExp> | ((warning: string) => boolean);
    readonly analyze?: boolean;

    readonly favicon?: string;
    readonly faviconType?: string;
    readonly mobile?: boolean;
    readonly insertion?: string;
    readonly skipNodeModulesSourceMapping?: boolean;

    readonly template?: string;
    readonly defines?: Record<string, string>;
    readonly copies?: CopyPlugInElement[];
    readonly plugins?: any[];
};

export const getWebpackTarget = (target?: AvailableWebpackTarget): WebpackTarget => {

    if (!target) {
        return 'web';
    }

    const available: AvailableWebpackTarget[] = [
        'electron-renderer',
        'web',
    ];

    if (available.includes(target)) {
        return target;
    }

    return 'web';
};
