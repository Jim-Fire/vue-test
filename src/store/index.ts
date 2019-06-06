import Vuex from 'vuex';
import Vue from 'vue';
import user from './modules/user';
import geo from './modules/geo';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    user,
    geo,
  },
});
