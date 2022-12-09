import Vue from 'vue';
import Vuex from 'vuex';
import app from './app';
import user from './user';
import home from './home';

import villageMange from './villageMange'; // 村庄申报、村庄审核
import projectAcceptance from './projectAcceptance'; // 村庄申报、村庄审核

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    villageMange,
    projectAcceptance,
    home,
  },
  getters: {
    systemTitle: (state) => state.user.systemTitle,
    roleSystemType: (state) => state.user.roleSystemType,
    changeSystem: (state) => state.user.changeSystem,
    hasGetRoute: (state) => state.user.hasGetRoute,
    hasGetUserCommonInfo: (state) => state.user.hasGetUserCommonInfo,
    userInfo: (state) => state.user.userInfo,
    permissionList: (state) => state.user.permissionList,
    routeList: (state) => state.user.routeList,
    declareType: (state) => state.projectAcceptance.declareType,
    area: (state) => state.home.area,
    location: (state) => state.home.location,
    batch: (state) => state.home.batch,
  },
});

export default store;
