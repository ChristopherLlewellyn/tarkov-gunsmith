import createPersistedState from 'vuex-persistedstate';
import Vue from 'vue';
import Vuex from 'vuex';
import {
  version
} from '../../package.json';

// Modules
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
    version: ''
  },
  modules: {
    authentication,
    createLoadout,
    myLoadouts,
    editLoadout,
    searchLoadouts,
    viewLoadout,
  },
  getters: {
    appVersion: (state) => {
      return state.version
    }
  },
  mutations: {
    loadCachedState(state, localStore) {
      this.replaceState(
        Object.assign(state, localStore)
      );
    },
    setVersion(state, version) {
      state.version = version
    }
  },
  actions: {
    initialiseStore({
      state,
      commit,
      dispatch
    }) {
      // Check if the store exists
      if (localStorage.getItem('vuex')) {
        let store = JSON.parse(localStorage.getItem('vuex'));

        // Check the version stored against current. If different, don't
        // load the cached version and reset all modules
        if (store.version == version) {
          commit('loadCachedState', store);
        } else {
          dispatch('clearAll');
          commit('setVersion', version)
        }
      }
    },
    clearAll({
      commit
    }) {
      commit('authentication/reset');
      commit('createLoadout/reset');
      commit('editLoadout/reset');
      commit('myLoadouts/reset');
      commit('searchLoadouts/reset');
      commit('viewLoadout/reset');
    }
  },
  plugins: [
    createPersistedState(),
  ],
});
