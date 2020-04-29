import HTTP from '../../http';
import router from '../../router';

export default {
  namespaced: true,
  state: {
    loading: true,
    loadoutId: null,
    loadoutName: '',
    username: null,
    votes: null,
    updated: null,
    captcha: null,

    votedOn: [],

    weapon: {},
    allItems: [],
    market_price: 0,
    calculatedErgonomics: 0,
    calculatedHorizontalRecoil: 0,
    calculatedVerticalRecoil: 0,

    attachments: [],
  },

  actions: {

    fillLoadoutDetails({ commit, state }) {
      commit('setLoading', true);
      return HTTP().get(`/gunbuilds/${state.loadoutId}`)
        .then(({ data }) => {
          commit('setLoadoutDetails', data);
          commit('calculateWeaponStats');
          commit('formatDates');
          commit('setLoading', false);
        })
        .catch((error) => {
          if (error.response.status === '404') {
            router.push('/');
          } else {
            router.push('/');
          }
        });
    },

    upvote({ commit, state }) {
      return HTTP().patch(`/gunbuilds/${state.loadoutId}/vote`, {
        vote: 1,
        captcha: state.captcha,
      })
        .then(({ data }) => {
          commit('incrementVotes');
        });
    },

    downvote({ commit, state }) {
      return HTTP().patch(`/gunbuilds/${state.loadoutId}/vote`, {
        vote: -1,
        captcha: state.captcha,
      })
        .then(({ data }) => {
          commit('decrementVotes');
        });
    },
  },

  mutations: {

    setLoadoutDetails(state, data) {
      state.weapon = JSON.parse(data.gunbuild.gunbuild.build);
      state.allItems = JSON.parse(data.gunbuild.gunbuild.all_items)

      state.loadoutName = data.gunbuild.gunbuild.name;
      state.username = data.gunbuild.user.username;
      state.votes = data.gunbuild.gunbuild.voteCount.votes;
      state.updated = data.gunbuild.gunbuild.updated_at;
    },

    reset(state) {
      state.availableWeapons = [];
      state.availableAttachments = [];
      state.loadoutName = '';

      state.weapon = {};

      state.weaponStatsCalculated = {};

      state.attachments = [];

      state.alert = null;
    },

    calculateWeaponStats(state) {
      let { ergonomics } = state.weapon;
      let { horizontal_recoil } = state.weapon;
      let { vertical_recoil } = state.weapon;
      let price = 0;
      let recoil_reduction = 0;

      state.allItems.forEach((attachment) => {
        if (attachment.ergonomics_modifier && attachment.ergonomics_modifier !== null) {
          ergonomics += attachment.ergonomics_modifier;
        }

        if (attachment.recoil_modifier && attachment.recoil_modifier !== null) {
          recoil_reduction += attachment.recoil_modifier;
        }

        if (attachment.price && attachment.price !== null) {
          price += attachment.avg_24h_price;
        }
      });

      horizontal_recoil = Math.round(state.weapon.horizontal_recoil * ((100 + recoil_reduction) / 100));
      vertical_recoil = Math.round(state.weapon.vertical_recoil * ((100 + recoil_reduction) / 100));

      state.calculatedErgonomics = ergonomics;
      state.calculatedHorizontalRecoil = horizontal_recoil;
      state.calculatedVerticalRecoil = vertical_recoil;
      state.market_price = price;
    },

    setLoadoutId(state, id) {
      state.loadoutId = id;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setCaptcha(state, captcha) {
      state.captcha = captcha;
    },
    setVotedOn(state, id) {
      state.votedOn.push(id);
    },

    incrementVotes(state) {
      state.votes += 1;
    },
    decrementVotes(state) {
      state.votes -= 1;
    },

    formatDates(state) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };

      const date = state.updated;
      let dateNew = new Date(date);
      dateNew = dateNew.toLocaleDateString(undefined, options);
      state.updated = dateNew;
    },
  },
};
