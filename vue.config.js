const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const name = "历史文化村落保护管理系统";

module.exports = {
  productionSourceMap: false,

  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "./src/assets/style/mixin.scss"; @import "./src/assets/style/variables.scss";`,
      },
    },
  },

  configureWebpack: {
    name: name,
  },

  chainWebpack(config) {
    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },

  devServer: {
    proxy: {
      "/apiProxy": {
        target: "http://172.16.24.248:8280/", // 测试环境
        changeOrigin: true,
        pathRewrite: (path) => path.replace("/apiProxy", ""),
      },
    },
  },
};
