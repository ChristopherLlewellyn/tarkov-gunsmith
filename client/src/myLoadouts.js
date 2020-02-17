import HTTP from './http'
import router from './router'

export default {
  namespaced: true,
  state: {
    loadouts: []
  },

  actions: {
    fetchMyLoadouts({ commit }) {
      return HTTP().get('/gunbuilds/mine')
      .then(({ data }) => {
        commit('setLoadouts', data.data[0])
      })
    },
  },

  mutations: {
    setLoadouts(state, myLoadouts) {
      state.loadouts = myLoadouts
    },
  },
}