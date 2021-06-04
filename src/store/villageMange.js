export default {
  namespaced: true,
  state: {
    applyVillageList: [], // 申报村庄列表
  },
  mutations: {
    // 新增村庄申报列表
    addApplyVillageList(state, value) {
      state.applyVillageList.push(value);
    },
    changeApplyVillageList(state, value) {
      state.applyVillageList = value;
    },
  },
};
