import HTTP from '../../http';
import router from '../../router';

export default {
  namespaced: true,
  state: {
    loading: true,

    loadouts: [],
    loadoutToDelete: null,
  },

  actions: {
    fetchMyLoadouts({
      commit
    }) {
      commit('setLoading', true);
      return HTTP().get('/gunbuilds/mine')
        .then(({
          data
        }) => {
          commit('setLoadouts', data.gunbuilds);
          commit('formatDates');
          commit('setLoading', false);
        });
    },

    deleteLoadout({
      commit,
      state
    }) {
      return HTTP().delete(`/gunbuilds/${state.loadoutToDelete}`)
        .then(({
          data
        }) => {
          commit('removeLoadout', state.loadoutToDelete);
        });
    },
  },

  mutations: {
    reset(state) {
      state.loading = true;
      state.loadouts = [];
      state.loadoutToDelete = null;
    },
    setLoadouts(state, myLoadouts) {
      state.loadouts = myLoadouts;
    },

    setLoadoutToDelete(state, loadoutToDelete) {
      state.loadoutToDelete = loadoutToDelete;
    },

    removeLoadout(state, loadoutToDelete) {
      state.loadouts = state.loadouts.filter(loadout => loadout.id !== loadoutToDelete);
    },

    setLoading(state, loading) {
      state.loading = loading;
    },

    formatDates(state) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };

      for (let i = 0; i < state.loadouts.length; i++) {
        const date = state.loadouts[i].updated_at;
        let dateNew = new Date(date);
        dateNew = dateNew.toLocaleDateString(undefined, options);
        state.loadouts[i].updated_at = dateNew;
      }
    },

  },
};
