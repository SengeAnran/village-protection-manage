const proConfig = {
  apiHost: '/api/lswhcl',
  loginPath: window.location.origin + '/lswhcl',
  routerBase: '/lswhcl',
  sn_loginPath: 'https://szsn.zjagri.cn/sso/assets/szsnbg/login.html', //三农平台默认登录地址
};

const devConfig = {
  apiHost: '/apiProxy', // 历史文化
  // apiHost: "http://172.16.27.121:8280", // 历史文化
  apiHost2: '/apiFun', // 未来乡村
  // apiHost2: "http://172.16.27.121:8680", // 未来乡村
  apiHost3: '/apiWX', // 未来乡村微信小程序
  // apiHost3: "http://172.16.25.142:5000", // 未来乡村微信小程序
  loginPath: window.location.origin + '/admin',
  routerBase: '/admin',
};

const config = process.env.VUE_APP_ENV === 'production' ? proConfig : devConfig;

export default config;
