import HTTP from './http'
import router from './router'

export default {
  namespaced: true,
  state: {
    loadouts: [],
    loadoutToDelete: null,
  },

  actions: {
    fetchMyLoadouts({ commit }) {
      return HTTP().get('/gunbuilds/mine')
      .then(({ data }) => {
        commit('setLoadouts', data.data[0])
      })
    },

    deleteLoadout({ commit, state }) {
      return HTTP().delete(`/gunbuilds/${state.loadoutToDelete}`)
      .then(({ data }) => {
        commit('removeLoadout', state.loadoutToDelete)
      })
    },
  },

  mutations: {
    setLoadouts(state, myLoadouts) {
      state.loadouts = myLoadouts
    },

    setLoadoutToDelete(state, loadoutToDelete) {
      state.loadoutToDelete = loadoutToDelete
    },

    removeLoadout(state, loadoutToDelete) {
      state.loadouts = state.loadouts.filter(loadout => loadout.id !== loadoutToDelete)
    },
  },
}