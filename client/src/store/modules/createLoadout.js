import HTTP from '../../http';
import router from '../../router';

export default {
  namespaced: true,
  state: {
    loading: true,
    attachmentsLoading: true,
    weaponsLoading: true,

    availableWeapons: [],
    availableAttachments: [],
    defaultAttachments: [],
    loadoutName: '',

    weapon: {},
    allItems: [],
    calculatedErgonomics: 0,
    calculatedHorizontalRecoil: 0,
    calculatedVerticalRecoil: 0,
    market_price: 0,

    alert: null,
    titleError: null,
  },

  actions: {
    fetchAttachments({ commit }) {
      commit('setLoading', true);
      commit('setAttachmentsLoading', true);
      return HTTP().get('/attachments')
        .then(({ data }) => {
          commit('setAvailableAttachments', data.attachments);
          commit('setLoading', false);
          commit('setAttachmentsLoading', false);
        });
    },

    fetchWeapons({ commit }) {
      commit('setLoading', true);
      commit('setWeaponsLoading', true);
      return HTTP().get('/guns')
        .then(({ data }) => {
          commit('setAvailableWeapons', data.guns);
          commit('setWeapon', data.guns[0]);
          commit('addItem', data.guns[0])
          commit('calculateWeaponStats');
          commit('setLoading', false);
          commit('setWeaponsLoading', false);
        });
    },

    createLoadout({ commit, state }) {
      return HTTP().post('/gunbuilds', {
        gun_id: state.weapon.id,
        name: state.loadoutName,
        ergonomics_final: state.calculatedErgonomics,
        vertical_recoil_final: state.calculatedVerticalRecoil,
        horizontal_recoil_final: state.calculatedHorizontalRecoil,
        build: state.weapon,
        all_items: state.allItems,
        market_price: state.market_price
      })
        .then(({ data }) => {
          commit('reset');
          router.push('/');
        })
        .catch((error) => {
          if (error.response.data.message) {
            commit('setTitleError', error.response.data.message);
          } else {
            commit('setTitleError', error.response.data[0].message); // message from response body
          }
        });
    },
  },

  mutations: {
    reset(state) {
      state.loading = true;
      state.attachmentsLoading = true;
      state.weaponsLoading = true;
  
      state.availableWeapons = [];
      state.availableAttachments = [];
      state.defaultAttachments = [];
      state.loadoutName = '';
  
      state.weapon = {};
      state.allItems = [];
  
      state.weaponStatsCalculated = {};
  
      state.alert = null;
      state.titleError = null;
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
          price += attachment.price;
        }
      });

      horizontal_recoil = Math.round(state.weapon.horizontal_recoil * ((100 + recoil_reduction) / 100));
      vertical_recoil = Math.round(state.weapon.vertical_recoil * ((100 + recoil_reduction) / 100));

      state.calculatedErgonomics = ergonomics;
      state.calculatedHorizontalRecoil = horizontal_recoil;
      state.calculatedVerticalRecoil = vertical_recoil;
      state.market_price = price;
    },

    // Weapon selector
    setAvailableWeapons(state, availableWeapons) {
      for (let weapon of availableWeapons) {
        weapon.slots = JSON.parse(weapon.slots)
      }
      state.availableWeapons = availableWeapons;
    },
    setWeapon(state, weapon) {
      state.weapon = weapon;
    },

    // Attachments selector
    setAvailableAttachments(state, availableAttachments) {
      for (let attachment of availableAttachments) {
        attachment.slots = JSON.parse(attachment.slots)
      }
      state.availableAttachments = availableAttachments;
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
    setWeaponsLoading(state, weaponsLoading) {
      state.weaponsLoading = weaponsLoading;
    },
    setAttachmentsLoading(state, attachmentsLoading) {
      state.attachmentsLoading = attachmentsLoading;
    },
    setTitleError(state, error) {
      state.titleError = error;
    },
    refreshAllItems(state) {
      state.allItems = [];
      state.allItems.push(state.weapon);
    },
    addItem(state, item) {
      state.allItems.push(item);
    },
    setAllItems(state, node) {
      if (node.slots && node.slots != undefined) {
        for (let slot of Object.keys(node.slots)) {
          if (node.slots[slot].selected && node.slots[slot].selected != undefined) {
            state.allItems.push(node.slots[slot].selected);
            this.setAllItems(node.slots[slot].selected);
          }
        }
      }
    },
  },
};
