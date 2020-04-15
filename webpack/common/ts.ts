/**
 * @author WMXPY
 * @namespace Webpack
 * @description Typescript Loader
 */

export const createTypescriptLoader = (TSCONFIG_DIR: string) => ({

    test: /\.tsx?$/,
    use: [{
        loader: 'ts-loader',
        options: {
            configFile: TSCONFIG_DIR,
        },
    }],
});


export const getResolves = () => ({
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".css", ".sass"],
    },
});
