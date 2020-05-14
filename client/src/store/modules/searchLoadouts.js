import HTTP from '../../http';
import router from '../../router';

export default {
  namespaced: true,
  state: {
    loading: true,
    loadouts: [],
    gunToIndexBy: 'Any',
    guns: [],
    gunNames: [],
    gunNamesFilter: [],
  },

  actions: {
    fetchLoadouts({ commit, state }) {
      commit('setLoading', true);

      if (state.gunToIndexBy === 'Any') {
        return HTTP().get('/gunbuilds')
          .then(({ data }) => {
            commit('setLoadouts', data.gunbuilds);
            commit('formatDates');
            commit('setLoading', false);
          });
      }


      return HTTP().get(`/gunbuilds/indexbygun/${state.gunToIndexBy}`)
        .then(({ data }) => {
          commit('setLoadouts', data.gunbuilds);
          commit('formatDates');
          commit('setLoading', false);
        });
    },

    fetchGuns({ commit }) {
      return HTTP().get('/guns')
        .then(({ data }) => {
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

    setGunToIndexBy(state, gun) {
      let gun_id = gun;
      if (gun !== 'Any') {
        gun_id = state.guns.filter(x => x.name === gun)[0].id;
      }

      state.gunToIndexBy = gun_id;
    },

    setGuns(state, guns) {
      const gunList = [];
      for (let i = 0; i < guns.length; i++) {
        const gun = { id: guns[i].id, name: guns[i].name };
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
      const options = { year: 'numeric', month: 'long', day: 'numeric' };

      for (let i = 0; i < state.loadouts.length; i++) {
        const date = state.loadouts[i].updated_at;
        let dateNew = new Date(date);
        dateNew = dateNew.toLocaleDateString(undefined, options);
        state.loadouts[i].updated_at = dateNew;
      }
    },
  },
};
