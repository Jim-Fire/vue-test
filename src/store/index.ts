import Vuex from 'vuex';
import Vue from 'vue';
import user from './user';
import geo from './geo';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    user,
    geo,
  },
});
