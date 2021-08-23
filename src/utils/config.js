const proConfig = {
  apiHost: "/api/lswhcl",
  loginPath: window.location.origin + "/lswhcl",
  routerBase: "/lswhcl",
};

const devConfig = {
  apiHost: "/apiProxy",
  loginPath: window.location.origin,
  routerBase: "/",
};

const config = process.env.VUE_APP_ENV === "production" ? proConfig : devConfig;

export default config;
