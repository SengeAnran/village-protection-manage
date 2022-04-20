const proConfig = {
  apiHost: "/api/lswhcl",
  loginPath: window.location.origin + "/lswhcl",
  routerBase: "/lswhcl",
  sn_loginPath: "https://szsn.zjagri.cn/sso/assets/szsnbg/login.html", //三农平台默认登录地址
};

const devConfig = {
  apiHost: "/apiProxy", // 历史文化
  apiHost2: "/apiFun", // 未来乡村
  apiHost3: "/apiWX", // 未来乡村微信小程序
  loginPath: window.location.origin + "/admin",
  routerBase: "/admin",
};

const config = process.env.VUE_APP_ENV === "production" ? proConfig : devConfig;

export default config;
