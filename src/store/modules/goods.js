const state = {
  list: []
};

const mutations = {
  SET_LIST(state, list) {
    state.list = list;
  }
};

const actions = {
  async getList({ commit }) {
    try {
      const goods = require("@/assets/data/goods.json");
      commit("SET_LIST", goods);
    } catch (e) {
      console.error(e);
    }
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
