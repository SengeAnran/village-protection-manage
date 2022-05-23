// import config from './src/utils/config';
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
const name = '历史文化村落保护管理应用';

const publicPath = process.env.VUE_APP_ENV === 'production' ? '/v2/admin' : '/v2/admin';
// const publicPath = config.routerBase;
module.exports = {
  publicPath,
  productionSourceMap: false,
  lintOnSave: false,
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
    config.module.rule('svg').exclude.add(resolve('src/icons')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },

  devServer: {
    proxy: {
      '/api/lswhcl': {
        target: 'http://jqy.zjagri.cn/', //生产环境
        changeOrigin: true,
      },
      '/v2/apiProxy': {
        // 历史文化
        target: 'http://172.16.25.142:8280/', // 测试环境1
        changeOrigin: true,
        pathRewrite: (path) => path.replace('/v2/apiProxy', ''),
        headers: {
          Connection: 'keep-alive',
          'APPLICATION-ID': '3',
        },
      },
      '/v2/apiFun': {
        // 未来乡村
        // target: 'http://172.16.25.142:8680/', // 测试环境
        target: 'http://172.16.25.142:5000/', // 测试环境
        changeOrigin: true,
        pathRewrite: (path) => path.replace('/v2/apiFun', ''),
        headers: {
          Connection: 'keep-alive',
          'APPLICATION-ID': '4',
        },
      },
      '/v2/apiWX': {
        // 未来乡村小程序
        target: 'http://172.16.25.142:5000/', // 测试环境
        changeOrigin: true,
        pathRewrite: (path) => path.replace('/v2/apiWX', ''),
        headers: {
          Connection: 'keep-alive',
        },
      },
    },
  },
};
