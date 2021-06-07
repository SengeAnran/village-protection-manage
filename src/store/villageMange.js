const declareList = {
  id: 0,
  declareYear: 0,
  declareType: 0, // 1001 1002 1003
};
export default {
  namespaced: true,
  state: {
    declareList: { ...declareList },
  },
  mutations: {
    changeDeclareList(state, param) {
      state.declareList = param;
    },
    resetDeclareList(state) {
      state.declareList = { ...declareList };
    },
  },
};
