const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
    transpileDependencies: true,
    pages: {
        index: {
            entry: "examples/main.ts", //入口
            template: "public/index.html", //模板
            filename: "index.html", //输出文件
        },
    },
    chainWebpack: (config) => {
        config.resolve.alias.set("~", path.resolve("packages"));
        config.resolve.alias.set("@", path.resolve("examples"));
        config.module
            .rule("js")
            .include.add("/packages")
            .end()
            .use("babel")
            .loader("babel-loader")
            .tap((options) => {
                return options;
            });
    },
    configureWebpack: {
        output: {
            libraryExport: "default",
        },
    },
});
