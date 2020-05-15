import HTTP from '../../http';
import router from '../../router';

export default {
  namespaced: true,
  state: {
    loading: true,
    loadouts: [],
    filters: {},
    guns: [],
    gunNames: [],
    gunNamesFilter: [],
  },

  actions: {
    fetchLoadouts({
      commit,
      state
    }) {
      commit('setLoading', true);

      let gun = state.filters.gun; // 'Any' or '' are acceptable values for the gun parameter
      let priceRangeMin = state.filters.priceRangeMin;
      let priceRangeMax = state.filters.priceRangeMax;

      return HTTP().get('/gunbuilds', {
          params: {
            gun: gun,
            priceRangeMin: priceRangeMin,
            priceRangeMax: priceRangeMax
          }
        })
        .then(({
          data
        }) => {
          commit('setLoadouts', data.gunbuilds);
          commit('formatDates');
          commit('setLoading', false);
        });
    },

    fetchGuns({
      commit
    }) {
      return HTTP().get('/guns')
        .then(({
          data
        }) => {
          commit('setGuns', data.guns);
          commit('setGunNames', data.guns);
        });
    },
  },

  mutations: {
    setLoadouts(state, myLoadouts) {
      state.loadouts = myLoadouts;
    },

    setLoading(state, loading) {
      state.loading = loading;
    },

    setFilters(state, filters) {
      // Need to perform a clone in order to avoid "do not mutate outside the store"
      state.filters = Object.assign(filters);
    },

    setGuns(state, guns) {
      const gunList = [];
      for (let i = 0; i < guns.length; i++) {
        const gun = {
          id: guns[i].id,
          name: guns[i].name
        };
        gunList.push(gun);
      }
      state.guns = gunList;
    },

    setGunNames(state, guns) {
      const gunList = [];
      for (let i = 0; i < guns.length; i++) {
        const gun = guns[i].name;
        gunList.push(gun);
      }
      state.gunNames = gunList;
      state.gunNamesFilter = gunList;
      state.gunNamesFilter.unshift('Any');
    },

    setGunNamesFilter(state, gunNamesFilter) {
      state.gunNamesFilter = gunNamesFilter;
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
