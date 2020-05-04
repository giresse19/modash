import Vuex from "vuex";
import Vue from "vue";
import ListItem from "./modules/UserList";

// Load Vuex
Vue.use(Vuex);

// create store
export default new Vuex.Store({
  modules: {
    ListItem,
  },
});
