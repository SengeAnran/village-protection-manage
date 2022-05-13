const proConfig = {
  apiHost: '/api/lswhcl',
  // loginPath: window.location.origin + '/lswhcl',
  loginPath: 'https://wlxc.xscitydo.com:28080/portal/',
  routerBase: '/lswhcl',
  sn_loginPath: 'https://szsn.zjagri.cn/sso/assets/szsnbg/login.html', //三农平台默认登录地址
};

const devConfig = {
  apiHost: '/v2/apiProxy', // 历史文化
  // apiHost: "http://172.16.27.121:8280", // 历史文化
  apiHost2: '/v2/apiFun', // 未来乡村
  // apiHost2: "http://172.16.27.121:8680", // 未来乡村
  apiHost3: '/v2/apiWX', // 未来乡村微信小程序
  // apiHost3: "http://172.16.25.142:5000", // 未来乡村微信小程序
  // loginPath: window.location.origin + '/admin',
  // loginPath: 'https://wlxc.xscitydo.com:28080/portal/', // 测试环境
  loginPath: 'https://jqy.zjagri.cn/v2/portal/', // 生产环境2
  // loginPath: 'http://223.4.73.15/portal/', // 生产环境
  routerBase: '/v2/admin',
};

const config = process.env.VUE_APP_ENV === 'production' ? proConfig : devConfig;

export default config;
