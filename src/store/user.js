import { pwdLogin, logout, getUserInfo, getUserCommonInfo, getUserPermission, getUserPermission2 } from '@/api/user';
import { getUserPermission3 } from '@/api3/user';
// import { removeToken } from "@/utils/auth";
import { handleLoginOut } from '@/utils/auth';
// import config from "@/utils/config";
const systemTitleType = {
  3: '历史文化村落保护管理应用',
  4: '浙江省未来乡村建设服务平台',
  1: '未来乡村小程序管理后台',
  2: '跟着节气游乡村管理后台',
};
export default {
  namespaced: true,
  state: {
    token: '',
    roleSystemType: window.localStorage.getItem('roleSystemType') || 4,
    changeSystem: false, //
    systemTitle: '浙江省未来乡村建设服务平台',
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
      window.localStorage.setItem('roleSystemType', payload);
      state.systemTitle = systemTitleType[payload];
      console.log('systemTitle', state.systemTitle);
      state.roleSystemType = payload;
    },
    // SET_END_CHANGE_ROLE(state) {
    //   state.changeRole = false;
    // },
    SET_ROLE_LIST(state, payload) {
      state.roleList = payload;
    },
    SET_USER_INFO(state, data) {
      state.userInfo = data || {};
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
    getRouteList({ commit }, params) {
      return new Promise((resolve) => {
        getUserInfo(params).then((res1) => {
          commit('SET_USER_INFO', res1 || {});
          console.log(params);
          switch (params) {
            case 3:
              {
                getUserPermission().then((data) => {
                  commit('SET_PERMISSION_LIST', data || []);
                  resolve();
                });
              }
              break;
            case 4:
              {
                getUserPermission2().then((data) => {
                  commit('SET_PERMISSION_LIST', data || []);
                  resolve();
                });
              }
              break;
            case 1:
              {
                getUserPermission3().then((data) => {
                  commit('SET_PERMISSION_LIST', data || []);
                  resolve();
                });
              }
              break;
            default: {
              getUserPermission().then((data) => {
                commit('SET_PERMISSION_LIST', data || []);
                resolve();
              });
            }
          }
          // if (params === 2) {
          //   getUserPermission2().then((data) => {
          //     commit("SET_PERMISSION_LIST", data || []);
          //     resolve();
          //   });
          // } else {
          //   getUserPermission().then((data) => {
          //     commit("SET_PERMISSION_LIST", data || []);
          //     resolve();
          //   });
          // }
        });
      });
    },
  },
};
