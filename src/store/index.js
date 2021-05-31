import Vue from "vue";
import Vuex from "vuex";
import app from "./app";
import user from "./user";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
  },
  getters: {
    hasGetRoute: (state) => state.user.hasGetRoute,
    userInfo: (state) => state.user.userInfo,
    permissionList: (state) => state.user.permissionList,
    routeList: (state) => state.user.routeList,
  },
});

export default store;
