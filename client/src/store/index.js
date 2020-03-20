import createPersistedState from 'vuex-persistedstate';
import Vue from 'vue';
import Vuex from 'vuex';
import authentication from './modules/authentication';
import createLoadout from './modules/createLoadout';
import myLoadouts from './modules/myLoadouts';
import editLoadout from './modules/editLoadout';
import searchLoadouts from './modules/searchLoadouts';
import viewLoadout from './modules/viewLoadout';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    baseUrl: '/api',
  },
  modules: {
    authentication,
    createLoadout,
    myLoadouts,
    editLoadout,
    searchLoadouts,
    viewLoadout,
  },
  mutations: {

  },
  actions: {

  },
  plugins: [
    createPersistedState(),
  ],
});
