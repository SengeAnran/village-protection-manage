const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const name = "历史文化村落保护管理应用";

const publicPath = process.env.VUE_APP_ENV === "production" ? "/lswhcl" : "/";
module.exports = {
  publicPath,
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
      "/api/lswhcl": {
        target: "http://jqy.zjagri.cn/", //生产环境
        changeOrigin: true,
      },
      "/apiProxy": { // 历史文化
        target: "http://172.16.24.248:8280/", // 测试环境1
        // target: "http://172.16.27.121:8280/", // 测试环境
        // target: "http://172.16.27.121:8280/", // 其他版本测试环境
        changeOrigin: true,
        pathRewrite: (path) => path.replace("/apiProxy", ""),
      },
      "/apiFun": { // 未来乡村
        target: "http://172.16.27.121:8280/", // 测试环境
        changeOrigin: true,
        pathRewrite: (path) => path.replace("/apiFun", ""),
      },
      "/apiWX": { // 未来乡村小程序
        target: "http://172.16.27.121:5000/", // 测试环境
        changeOrigin: true,
        pathRewrite: (path) => path.replace("/apiWX", ""),
      },
    },
  },
};
