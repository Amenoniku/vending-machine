const state = {
  availableBanknotes: [50, 100, 200, 500, 1000],
  availableCoins: [1, 2, 5, 10],
  banknotes: [],
  product: null,
  changes: []
};

const mutations = {
  ADD_BANKNOTE(state, banknote) {
    state.banknotes.push(banknote);
  },
  REMOVE_BANKNOTE(state) {
    state.banknotes = [];
  },
  ADD_PRODUCT(state, product) {
    state.product = product;
  },
  REMOVE_PRODUCT(state) {
    state.product = null;
  },
  ADD_CHANGES(state, changes) {
    state.changes = changes;
  },
  REMOVE_CHANGES(state) {
    state.changes = [];
  }
};

const actions = {
  addBanknote({ state, commit }, banknote) {
    if (state.availableBanknotes.some(someItem => someItem === banknote)) {
      return commit("ADD_BANKNOTE", banknote);
    } else {
      throw Error;
    }
  },
  chooseProduct({ commit, rootState, getters, dispatch }, productId) {
    const product = rootState.goods.list.find(
      findItem => findItem.id === productId
    );
    if (product) {
      if (getters.banknotesSummary >= product.price) {
        dispatch("addChanges", product.price);
        commit("ADD_PRODUCT", product);
      } else {
        throw "Not enough money!";
      }
    } else {
      throw "Enter the correct number!";
    }
  },
  addChanges({ state, commit, getters }, price) {
    const availableCoinsReverse = [...state.availableCoins].reverse();
    let changes = [];
    let divisionArray = [null, getters.banknotesSummary - price];
    let step = 0;
    while (divisionArray[1] !== undefined) {
      let coinType = availableCoinsReverse[step];
      divisionArray = (divisionArray[1] / coinType).toString().split(".");
      changes.push({ type: coinType, coins: divisionArray[0] });
      step++;
    }
    commit("ADD_CHANGES", changes);
  },
  removeProduct({ commit }) {
    commit("REMOVE_BANKNOTE");
    commit("REMOVE_PRODUCT");
    commit("REMOVE_CHANGES");
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
