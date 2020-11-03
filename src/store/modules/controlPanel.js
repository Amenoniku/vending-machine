const state = {
  availableBanknotes: [50, 100, 200, 500, 1000],
  availableCoins: [1, 2, 5, 10],
  banknotes: [],
  product: null,
  changes: []
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

const getters = {
  minPrice: (state, getters, rootState) => {
    const goods = rootState.goods.list;
    return goods.reduce(
      (min, p) => (p.price < min ? p.price : min),
      goods[0].price
    );
  },
  maxPrice: (state, getters, rootState) => {
    const goods = rootState.goods.list;
    return goods.reduce(
      (max, p) => (p.price > max ? p.price : max),
      goods[0].price
    );
  },
  banknotesSummary: state => state.banknotes.reduce((a, b) => a + b, 0)
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
