import { pwdLogin, logout, getUserInfo, getUserCommonInfo, getUserPermission } from '@/api/user';
// import { removeToken } from "@/utils/auth";
import { handleLoginOut } from '@/utils/auth';
// import config from "@/utils/config";
const systemTitleType = {
  3: '历史文化村落保护管理应用',
  4: '浙江省未来乡村建设服务平台',
  1: '未来乡村小程序管理后台',
  2: '跟着节气游乡村管理后台',
};
const roleIdType = {
  41: 1,
  31: 1,
  42: 2,
  32: 2,
  43: 3,
  33: 3,
};
export default {
  namespaced: true,
  state: {
    token: '',
    roleSystemType: window.localStorage.getItem('systemType') || 4,
    changeSystem: false, //
    systemTitle: window.localStorage.getItem('systemTitle') || '历史文化村落保护管理应用',
    roleList: [], // 角色列表
    userInfo: {}, // 用户信息
    userCommonInfo: {}, // 用户基础信息
    hasGetRoute: false, // 是否获取过路由信息
    hasGetUserCommonInfo: false, // 是否获取过用户基础信息
    permissionList: [], // 权限列表
    routeList: [], // 菜单列表
  },
  mutations: {
    setToken(state, value) {
      state.token = value;
    },
    SET_SYSTEM_TIME(state, payload) {
      console.log(state.roleSystemType, payload);
      if (state.roleSystemType !== payload) {
        state.changeSystem = true;
      }
      window.localStorage.setItem('systemType', payload);
      window.localStorage.setItem('systemTitle', systemTitleType[payload])
      state.systemTitle = systemTitleType[payload];
      console.log('systemTitle', state.systemTitle);
      state.roleSystemType = payload;
    },
    SET_SYSTEM_TITLE(state, value) {
      state.systemTitle = value;
    },
    SET_ROLE_LIST(state, payload) {
      state.roleList = payload;
    },
    SET_USER_INFO(state, data) {
      state.userInfo = data || {};
      if (data.roleId) {
        state.userInfo.roleId = roleIdType[data.roleId];
      }
    },
    SET_USER_COMMON_INFO(state, data) {
      state.userCommonInfo = data || {};
      state.hasGetUserCommonInfo = true;
    },
    SET_ROUTE_LIST(state, data) {
      state.routeList = data;
      // 修改路由获取状态
      state.hasGetRoute = true;
      // 角色目录列表获取结束
      state.changeSystem = false;
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
          commit('setToken', res.token);
          // getUserCommonInfo()
          resolve({ token: res.token });
        });
      });
    },
    // 密码登录
    getUserCommonInfo({ commit }) {
      return new Promise((resolve) => {
        getUserCommonInfo().then((res) => {
          commit('SET_USER_COMMON_INFO', res || {});
          console.log('获取完用户基础信息');
          resolve();
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
    // 获得目录
    getRouteList({ commit }, params) {
      return new Promise((resolve) => {
        getUserInfo(params).then((res1) => {
          commit('SET_USER_INFO', res1 || {});
          if (window.localStorage.getItem('systemTitle')) {
            commit('SET_SYSTEM_TITLE', window.localStorage.getItem('systemTitle'));
          }
          console.log(params);
          getUserPermission(params).then((data) => {
            commit('SET_PERMISSION_LIST', data || []);
            resolve();
          });
        });
      });
    },
  },
};
