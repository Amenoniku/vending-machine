import Vue from "vue";
import Vuex from "vuex";

// Modules
import goods from "./modules/goods";

Vue.use(Vuex);

const modules = {
  goods
};

export default new Vuex.Store({
  modules
});
