export default {
  namespaced: true,
  state: {
    searchQuery: {},
  },
  mutations: {
    SET_SEARCH_QUERY(state, value) {
      state.searchQuery = { ...value };
    },
    RESET_SEARCH_QUERY(state) {
      state.searchQuery = {};
    },
  },
};
