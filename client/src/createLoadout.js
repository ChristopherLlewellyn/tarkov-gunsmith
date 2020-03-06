import HTTP from './http';
import router from './router';

export default {
  namespaced: true,
  state: {
    loading: true,

    availableWeapons: [],
    availableAttachments: [],
    defaultAttachments: [],
    loadoutName: '',

    weapon: {
      id: 2,
      name: 'ADAR 2-15',
      src: 'https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/3/3c/ADAR2-15Image.png?version=5ce4ce8faa56a1c54bdb1cbab889f0d0',
      type: 'Assault rifle',
      calibre: '5.56x45mm NATO',
      rpm: 800,
      ergonomics: 48,
      horizontal_recoil: 407,
      vertical_recoil: 149,
    },

    weaponStatsCalculated: {
      ergonomics: 48,
      horizontal_recoil: 407,
      vertical_recoil: 149,
    },

    attachments: [],

    alert: null,
    titleError: null,
  },

  actions: {
    fetchAttachments({ commit }) {
      commit('setLoading', true);
      return HTTP().get('/attachments')
        .then(({ data }) => {
          commit('setAvailableAttachments', data.data);
          commit('setLoading', false);
        });
    },

    fetchWeapons({ commit }) {
      commit('setLoading', true);
      return HTTP().get('/guns')
        .then(({ data }) => {
          commit('setAvailableWeapons', data.data.guns);
          commit('setDefaultAttachments', data.data.defaultAttachments);
          commit('setWeapon', data.data.guns[1]);
          commit('calculateWeaponStats');
          commit('setLoading', false);
        });
    },

    createLoadout({ commit, state }) {
      return HTTP().post('/gunbuilds', {
        gun_id: state.weapon.id,
        name: state.loadoutName,
        ergonomics_final: state.weaponStatsCalculated.ergonomics,
        vertical_recoil_final: state.weaponStatsCalculated.vertical_recoil,
        horizontal_recoil_final: state.weaponStatsCalculated.horizontal_recoil,
        attachments: state.attachments,
      })
        .then(({ data }) => {
          commit('reset');
          router.push('/');
        })
        .catch((error) => {
          commit('setTitleError', error.response.data[0].message); // message from response body
        });
    },
  },

  mutations: {
    reset(state) {
      state.availableWeapons = [];
      state.availableAttachments = [];
      state.loadoutName = '';

      state.weapon = {
        id: 2,
        name: 'ADAR 2-15',
        src: 'https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/3/3c/ADAR2-15Image.png?version=5ce4ce8faa56a1c54bdb1cbab889f0d0',
        type: 'Assault rifle',
        calibre: '5.56x45mm NATO',
        rpm: 800,
        ergonomics: 48,
        horizontal_recoil: 407,
        vertical_recoil: 149,
      };

      state.attachments = [];

      state.alert = null;
      state.titleError = null;
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
          recoil_reduction += attachment.recoil_modifier
        }
      });

      horizontal_recoil = Math.round(state.weapon.horizontal_recoil * ((100 + recoil_reduction) / 100));
      vertical_recoil = Math.round(state.weapon.vertical_recoil * ((100 + recoil_reduction) / 100));

      state.weaponStatsCalculated.ergonomics = ergonomics;
      state.weaponStatsCalculated.horizontal_recoil = horizontal_recoil;
      state.weaponStatsCalculated.vertical_recoil = vertical_recoil;
    },

    // Weapon selector
    setAvailableWeapons(state, availableWeapons) {
      state.availableWeapons = availableWeapons;
    },
    setWeapon(state, weapon) {
      state.weapon.id = weapon.id;
      state.weapon.name = weapon.name;
      state.weapon.src = weapon.image;
      state.weapon.type = weapon.type;
      state.weapon.calibre = weapon.calibre;
      state.weapon.ergonomics = weapon.ergonomics_base;
      state.weapon.vertical_recoil = weapon.vertical_recoil_base;
      state.weapon.horizontal_recoil = weapon.horizontal_recoil_base;
      state.weapon.rpm = weapon.rpm;

      state.attachments = [];
      let defaultAttachments = state.defaultAttachments.filter(x => x.gun_id === weapon.id);
      
      for (let i = 0; i < defaultAttachments.length; i++) {
        let attachment = state.availableAttachments.find(x => x.id === defaultAttachments[i].attachment_id)
        state.attachments.push(attachment)
      }
    },

    // Attachments selector
    setAvailableAttachments(state, availableAttachments) {
      state.availableAttachments = availableAttachments;
    },
    setDefaultAttachments(state, defaultAttachments) {
      state.defaultAttachments = defaultAttachments;
    },
    addAttachment(state, attachment) {
      state.attachments.push(attachment);
    },
    deleteAttachment(state, attachment) {
      const index = state.attachments.indexOf(attachment);
      state.attachments.splice(index, 1);
    },
    updateAlert(state, item) {
      const message = `${item} has been added`;
      state.alert = message;
    },
    setLoadoutName(state, name) {
      state.loadoutName = name;
    },

    setLoading(state, loading) {
      state.loading = loading;
    },
    setTitleError(state, error) {
      state.titleError = error;
    },
  },
};
