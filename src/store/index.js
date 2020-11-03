import Vue from "vue";
import Vuex from "vuex";

// Modules
import goods from "./modules/goods";
import controlPanel from "./modules/controlPanel";

Vue.use(Vuex);

const modules = {
  goods,
  controlPanel
};

export default new Vuex.Store({
  modules
});
