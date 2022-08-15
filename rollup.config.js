import vue from "rollup-plugin-vue";
import resolve from "rollup-plugin-node-resolve";
import path from "path";
import json from "rollup-plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import alias from "@rollup/plugin-alias";
import babel from "rollup-plugin-babel";
import buble from "rollup-plugin-buble";
import replace from "rollup-plugin-replace";
import filesize from "rollup-plugin-filesize";
import Autoprefixer from "autoprefixer";

const external = ["vue"];

const plugins = [
    vue({
        // target: "browser",
        css: false,
        exposeFilename: true
    }),
    commonjs(),
    typescript({
        tsconfigOverride: {
            compilerOptions: {
                declaration: true
            },
            include: ["packages/**/*", "typings/shims-vue.d.ts"],
            exclude: ["node_modules", "packages/**/__tests__/*"]
        },
        abortOnError: false
    }),
    // buble(),
    replace({
        "process.env.NODE_ENV": JSON.stringify("production")
    }),
    json(),
    babel({
        exclude: "node_modules/**",
        runtimeHelpers: true
    }),
    alias({
        entries: [
            {
                find: "auto-form-lib", // 别名名称，作为依赖项目需要使用项目名
                replacement: path.resolve(__dirname, "src"),
                customResolver: resolve({
                    extensions: [".js", ".jsx", ".vue", ".sass", ".scss"]
                })
            }
        ]
    }),
    postcss({
        extract: true,
        minimize: true, // 生产环境开启压缩
        extensions: [".css", ".scss"], // 识别css和scss文件
        plugins: [Autoprefixer]
    })

    // filesize(),
    // terser()
];
const input = path.resolve(__dirname, "./packages/index.ts");

export default [
    {
        input,
        output: {
            file: "dist/index.umd.js",
            format: "umd", // umd格式为amd, cjs, iife的结合
            name: "rollup-vue-ts", // 此处修改为希望包挂在window上的名称
            sourcemap: false
        },
        plugins,
        external
    }
    // {
    //     input,
    //     output: {
    //         file: "lib/index.umd.js",
    //         format: "umd", // umd格式为amd, cjs, iife的结合
    //         name: "rollup-vue-ts", // 此处修改为希望包挂在window上的名称
    //         sourcemap: false
    //     },
    //     plugins,
    //     external
    // },
    // {
    //     input,
    //     output: {
    //         file: "lib/index.esm.js",
    //         format: "es", // es格式，推荐同时输出一份es格式的, 提供给模块化打包工具
    //         sourcemap: false
    //     },
    //     plugins,
    //     external
    // }
];
