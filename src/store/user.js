import { pwdLogin } from "@/api/user";

export default {
  namespaced: true,
  state: {
    token: "",
  },
  mutations: {
    setToken(state, value) {
      state.token = value;
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
  },
};
