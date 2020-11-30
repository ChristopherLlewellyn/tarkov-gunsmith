import HTTP from "../../http";
import router from "../../router";

export default {
  namespaced: true,
  state: {
    //! Remember to change the values in reset() function when updating these default values
    loading: true,
    loadMore: false,
    noMoreLoadouts: false,
    loadouts: [],
    filters: {},
    sortBy: "votes",
    sortDesc: true,
    offset: 0,
    limit: 20,
    guns: [],
    gunNames: [],
    gunNamesFilter: [],
    caliberNames: [],
    caliberNamesFilter: []
  },

  getters: {
    getSortBy(state) {
      return state.sortBy;
    },
    getSortDesc(state) {
      return state.sortDesc;
    },
    getOffset(state) {
      return state.offset;
    },
    getLimit(state) {
      return state.limit;
    }
  },

  actions: {
    fetchLoadouts({ commit, state }, loadMore = false) {
      if (loadMore) {
        commit("setLoadMore", true);
      } else {
        commit("setLoading", true);
      }

      let gun = state.filters.gun; // 'Any' or '' are acceptable values for the gun parameter
      let priceRangeMin = state.filters.priceRangeMin;
      let priceRangeMax = state.filters.priceRangeMax;
      let orderBy = state.sortBy;
      let orderByDescOrAsc = state.sortDesc == true ? "desc" : "asc";
      let offset = state.offset;
      let limit = state.limit; // Max number of loadouts grabbed from the API each call

      return HTTP()
        .get("/gunbuilds", {
          params: {
            gun: gun,
            priceRangeMin: priceRangeMin,
            priceRangeMax: priceRangeMax,
            orderBy: orderBy,
            orderByDirection: orderByDescOrAsc,
            offset: offset,
            limit: limit
          }
        })
        .then(({ data }) => {
          if (state.offset == 0) {
            commit("setLoadouts", data.gunbuilds);
          } else {
            commit("appendLoadouts", data.gunbuilds);
          }

          if (data.gunbuilds.length == 0) {
            commit("setNoMoreLoadouts", true);
          }

          commit("formatDates");
          commit("setLoading", false);
          commit("setLoadMore", false);
        });
    },

    fetchGuns({ commit }) {
      return HTTP()
        .get("/guns")
        .then(({ data }) => {
          commit("setGuns", data.guns);
          commit("setGunNames", data.guns);
          commit("setCaliberNames", data.guns);
        });
    }
  },

  mutations: {
    reset(state) {
      state.loading = true;
      state.loadMore = false;
      state.loadouts = [];
      state.filters = {};
      state.guns = [];
      state.gunNames = [];
      state.gunNamesFilter = [];
      state.caliberNames = [];
      state.caliberNamesFilter = [];
      state.sortBy = "votes";
      state.sortDesc = true;
      state.offset = 0;
      state.limit = 20;
      state.noMoreLoadouts = false;
    },

    setLoadouts(state, myLoadouts) {
      state.loadouts = myLoadouts;
    },

    appendLoadouts(state, loadouts) {
      for (let loadout of loadouts) {
        // Check for duplicates (just in case they appear for some reason)
        let found = state.loadouts.some(element => element.id === loadout.id);
        if (!found) state.loadouts.push(loadout);
      }
    },

    setLoading(state, loading) {
      state.loading = loading;
    },

    setLoadMore(state, loadMore) {
      state.loadMore = loadMore;
    },

    setFilters(state, filters) {
      // Need to perform a clone in order to avoid "do not mutate outside the store"
      state.filters = Object.assign(filters);
      state.offset = 0;
      state.noMoreLoadouts = false;
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
      state.gunNamesFilter.unshift("Any");
    },

    setCaliberNames(state, guns) {
      const caliberList = [];
      for (let i = 0; i < guns.length; i++) {
        const gun = guns[i].caliber;
        caliberList.push(gun);
      }
      state.caliberList = caliberList;
      state.caliberNamesFilter = caliberList;
      state.caliberNamesFilter.unshift("Any");
    },

    setGunNamesFilter(state, gunNamesFilter) {
      state.gunNamesFilter = gunNamesFilter;
    },

    setCaliberNamesFilter(state, caliberNamesFilter) {
      state.caliberNamesFilter = caliberNamesFilter;
    },

    setSortBy(state, sortBy) {
      state.sortBy = sortBy;
      state.offset = 0;
      state.noMoreLoadouts = false;
    },

    setSortDesc(state, sortDesc) {
      state.sortDesc = sortDesc;
      state.offset = 0;
      state.noMoreLoadouts = false;
    },

    setOffset(state, offset) {
      state.offset = offset;
    },

    setNoMoreLoadouts(state, noMoreLoadouts) {
      state.noMoreLoadouts = noMoreLoadouts;
    },

    formatDates(state) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };

      for (let i = 0; i < state.loadouts.length; i++) {
        const date = state.loadouts[i].updated_at;
        let dateNew = new Date(date);
        dateNew = dateNew.toLocaleDateString(undefined, options);
        state.loadouts[i].updated_at = dateNew;
      }

      for (let i = 0; i < state.loadouts.length; i++) {
        const date = state.loadouts[i].created_at;
        let dateNew = new Date(date);
        dateNew = dateNew.toLocaleDateString(undefined, options);
        state.loadouts[i].created_at = dateNew;
      }
    }
  }
};
