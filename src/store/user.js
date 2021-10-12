import { pwdLogin, logout, getUserInfo, getUserPermission } from "@/api/user";
// import { removeToken } from "@/utils/auth";
import { handleLoginOut } from "@/utils/auth";
// import config from "@/utils/config";

export default {
  namespaced: true,
  state: {
    token: "",
    roleList: [], // 角色列表
    userInfo: {}, // 用户信息
    hasGetRoute: false, // 是否获取过路由信息
    permissionList: [], // 权限列表
    routeList: [], // 菜单列表
  },
  mutations: {
    setToken(state, value) {
      state.token = value;
    },
    SET_ROLE_LIST(state, payload) {
      state.roleList = payload;
    },
    SET_USER_INFO(state, data) {
      state.userInfo = data || {};
    },
    SET_ROUTE_LIST(state, data) {
      state.routeList = data;
      // 修改路由获取状态
      state.hasGetRoute = true;
    },
    SET_PERMISSION_LIST(state, data) {
      state.permissionList = data;
    },
  },
  actions: {
    // 密码登录
    login({ commit }, params) {
      return new Promise((resolve) => {
        pwdLogin(params).then((res) => {
          commit("setToken", res.token);
          resolve({ token: res.token });
        });
      });
    },
    // // 登出
    // logout() {
    //   return new Promise((resolve) => {
    //     logout('ext').then(() => {
    //       removeToken();
    //       location.href = config.loginPath;
    //       resolve();
    //     });
    //   });
    // },
    // 登出
    logout(context, params) {
      return new Promise((resolve) => {
        logout(params.loginType).then(() => {
          handleLoginOut();
          resolve();
        });
      });
    },
    getRouteList({ commit }) {
      return new Promise((resolve) => {
        getUserInfo().then((res1) => {
          commit("SET_USER_INFO", res1 || {});
          getUserPermission().then((data) => {
            commit("SET_PERMISSION_LIST", data || []);
            resolve();
          });
        });
      });
    },
  },
};
