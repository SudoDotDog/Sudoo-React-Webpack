/**
 * @author WMXPY
 * @namespace Webpack
 * @description Typescript Loader
 */

export const createTypescriptLoader = (TSCONFIG_DIR: string) => ({

    test: /\.tsx?$/,
    use: [{
        loader: 'awesome-typescript-loader',
        options: {
            configFileName: TSCONFIG_DIR,
        },
    }],
});


export const getResolves = () => ({
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json", ".css", ".sass"],
    },
});
