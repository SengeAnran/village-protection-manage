const declareType = 1002;
export default {
  namespaced: true,
  state: {
    declareType: declareType,
  },
  mutations: {
    changeDeclareType(state, param) {
      state.declareType = param;
    },
    resetDeclareType(state) {
      state.declareType = declareType;
    },
  },
};