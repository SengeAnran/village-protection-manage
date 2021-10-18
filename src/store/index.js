import Vue from "vue";
import Vuex from "vuex";
import app from "./app";
import user from "./user";

import villageMange from "./villageMange"; // 村庄申报、村庄审核
import projectAcceptance from "./projectAcceptance"; // 村庄申报、村庄审核

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    villageMange,
    projectAcceptance,
  },
  getters: {
    hasGetRoute: (state) => state.user.hasGetRoute,
    userInfo: (state) => state.user.userInfo,
    permissionList: (state) => state.user.permissionList,
    routeList: (state) => state.user.routeList,
    declareType: (state) => state.projectAcceptance.declareType,
  },
});

export default store;
