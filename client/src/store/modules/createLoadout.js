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
    conflicts: [],
    allItems: [],
    calculatedErgonomics: 0,
    calculatedHorizontalRecoil: 0,
    calculatedVerticalRecoil: 0,
    market_price: 0,

    snackbar: false,
    error: null,
    captcha: null,
  },

  actions: {
    fetchAttachments({
      commit
    }) {
      commit('setLoading', true);
      commit('setAttachmentsLoading', true);
      return HTTP().get('/attachments')
        .then(({
          data
        }) => {
          commit('setAvailableAttachments', data.attachments);
          commit('setLoading', false);
          commit('setAttachmentsLoading', false);
        });
    },

    fetchWeapons({
      commit
    }) {
      commit('setLoading', true);
      commit('setWeaponsLoading', true);
      return HTTP().get('/guns')
        .then(({
          data
        }) => {
          commit('setAvailableWeapons', data.guns);
          commit('setWeapon', data.guns[0]);
          commit('addItem', data.guns[0])
          commit('calculateWeaponStats');
          commit('setLoading', false);
          commit('setWeaponsLoading', false);
        });
    },

    createLoadout({
      commit,
      state
    }) {
      return HTTP().post('/gunbuilds', {
          gun_id: state.weapon.id,
          name: state.loadoutName,
          ergonomics_final: state.calculatedErgonomics,
          vertical_recoil_final: state.calculatedVerticalRecoil,
          horizontal_recoil_final: state.calculatedHorizontalRecoil,
          build: state.weapon,
          all_items: state.allItems,
          market_price: state.market_price,

          captcha: state.captcha
        })
        .then(({
          data
        }) => {
          commit('reset');
          router.push('/');
        })
        .catch((error) => {
          if (error.response.data.message) {
            commit('setError', error.response.data.message);
            commit('setSnackbar', true);
          } else if (error.response.status == '429') {
            commit('setError', 'Too many requests, slow down');
            commit('setSnackbar', true);
          } else {
            commit('setError', error.response.data[0].message); // message from response body
            commit('setSnackbar', true);
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
      state.conflicts = [];
      state.allItems = [];

      state.calculatedErgonomics = 0;
      state.calculatedHorizontalRecoil = 0;
      state.calculatedVerticalRecoil = 0;

      state.snackbar = false;
      state.error = null;
      state.captcha = null;
    },

    calculateWeaponStats(state) {
      let {
        ergonomics
      } = state.weapon;
      let {
        horizontal_recoil
      } = state.weapon;
      let {
        vertical_recoil
      } = state.weapon;
      let avg_24h_price = 0;
      let recoil_reduction = 0;

      state.allItems.forEach((attachment) => {
        if (attachment.ergonomics_modifier && attachment.ergonomics_modifier !== null) {
          ergonomics += attachment.ergonomics_modifier;
        }

        if (attachment.recoil_modifier && attachment.recoil_modifier !== null) {
          recoil_reduction += attachment.recoil_modifier;
        }

        if (attachment.avg_24h_price && attachment.avg_24h_price !== null) {
          avg_24h_price += attachment.avg_24h_price;
        }
      });

      horizontal_recoil = Math.round(state.weapon.horizontal_recoil * ((100 + recoil_reduction) / 100));
      vertical_recoil = Math.round(state.weapon.vertical_recoil * ((100 + recoil_reduction) / 100));

      state.calculatedErgonomics = ergonomics;
      state.calculatedHorizontalRecoil = horizontal_recoil;
      state.calculatedVerticalRecoil = vertical_recoil;
      state.market_price = avg_24h_price;
    },

    setConflicts(state) {
      // Conflicts - if there is a conflict with an already selected attachment, this attachment is not compatible
      let conflicts = [];
      for (let item of state.allItems) {
        if (item.conflicts && Object.keys(item.conflicts).length > 0) {
          let conflictTypes = Object.values(item.conflicts);
          for (let conflictType of conflictTypes) {
            let conflictIds = Object.values(conflictType);
            for (let conflictId of conflictIds) {
              // Find out if the conflicting ID exists in allItems
              let conflict = state.allItems.some(a => a.bsg_id === conflictId);
              if (conflict) {
                let conflictingItemA = item.short_name;
                let conflictingItemB = state.allItems.find(({
                  bsg_id,
                }) => bsg_id === conflictId).short_name;
                let conflict = {
                  conflictingItemA: conflictingItemA,
                  conflictingItemB: conflictingItemB
                };
                conflicts.push(conflict);
              }
            }
          }
        }
      }
      state.conflicts = conflicts;
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

    setAvailableAttachments(state, availableAttachments) {
      for (let attachment of availableAttachments) {
        attachment.slots = JSON.parse(attachment.slots);
        attachment.conflicts = JSON.parse(attachment.conflicts);
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
    setLoadoutName(state, name) {
      state.loadoutName = name;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setSnackbar(state, value) {
      state.snackbar = value;
    },
    setCaptcha(state, captcha) {
      state.captcha = captcha;
    },
    setWeaponsLoading(state, weaponsLoading) {
      state.weaponsLoading = weaponsLoading;
    },
    setAttachmentsLoading(state, attachmentsLoading) {
      state.attachmentsLoading = attachmentsLoading;
    },
    setError(state, error) {
      state.error = error;
    },
    refreshAllItems(state) {
      state.allItems = [];
      state.allItems.push(state.weapon);
    },
    addItem(state, item) {
      state.allItems.push(item);
    },
    removeItem(state, item) {
      let index = state.allItems.findIndex(({
        bsg_id,
      }) => bsg_id === item.bsg_id);

      state.allItems.splice(index, 1);
    },
  },
};
