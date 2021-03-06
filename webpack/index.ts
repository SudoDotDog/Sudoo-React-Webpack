/**
 * @author WMXPY
 * @namespace Webpack
 * @description Index
 */

import * as Path from "path";
import * as Webpack from "webpack";
import { SudooWebpackInternal, SudooWebpackPath, SudooWebpackSetting } from "./declare";
import { createBuildConfig } from "./webpack.config";
import { createDevConfig } from "./webpack.dev";

export class SudooWebpackReact {

    public static create(path: SudooWebpackPath, setting: SudooWebpackSetting): SudooWebpackReact {

        return new SudooWebpackReact(path, setting);
    }

    private readonly _path: SudooWebpackPath;
    private readonly _setting: SudooWebpackSetting;

    private readonly _internal: SudooWebpackInternal;

    private constructor(
        path: SudooWebpackPath,
        setting: SudooWebpackSetting,
    ) {

        this._path = path;
        this._setting = setting;

        this._internal = {

            templatePath: setting.template ?? Path.join(__dirname, 'public', 'template.ejs'),
        };
    }

    public production(): Webpack.Configuration {

        return createBuildConfig(this._path, this._setting, this._internal);
    }

    public development(port: number): Webpack.Configuration {

        return createDevConfig(this._path, this._setting, this._internal, port);
    }
}
