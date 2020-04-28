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

    weaponStatsCalculated: {},

    attachments: [],
  },

  actions: {

    fillLoadoutDetails({ commit, state }) {
      commit('setLoading', true);
      return HTTP().get(`/gunbuilds/${state.loadoutId}`)
        .then(({ data }) => {
          commit('setLoadoutDetails', data);
          //commit('calculateWeaponStats');
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
      state.weapon.id = data.gunbuild.gun.id;
      state.weapon.name = data.gunbuild.gun.name;
      state.weapon.img_big = data.gunbuild.gun.img_big;
      state.weapon.type = data.gunbuild.gun.type;
      state.weapon.caliber = data.gunbuild.gun.caliber;
      state.weapon.rpm = data.gunbuild.gun.rpm;
      state.weapon.ergonomics = data.gunbuild.gunbuild.ergonomics_final;
      state.weapon.horizontal_recoil = data.gunbuild.gunbuild.horizontal_recoil_final;
      state.weapon.vertical_recoil = data.gunbuild.gunbuild.vertical_recoil_final;

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
      let recoil_reduction = 0;

      state.attachments.forEach((attachment) => {
        if (attachment.ergonomics_modifier !== null) {
          ergonomics += attachment.ergonomics_modifier;
        }

        if (attachment.recoil_modifier !== null && attachment.recoil_modifier !== 0) {
          recoil_reduction += attachment.recoil_modifier;
        }
      });

      horizontal_recoil = Math.round(state.weapon.horizontal_recoil * ((100 + recoil_reduction) / 100));
      vertical_recoil = Math.round(state.weapon.vertical_recoil * ((100 + recoil_reduction) / 100));

      state.weaponStatsCalculated.ergonomics = ergonomics;
      state.weaponStatsCalculated.horizontal_recoil = horizontal_recoil;
      state.weaponStatsCalculated.vertical_recoil = vertical_recoil;
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
