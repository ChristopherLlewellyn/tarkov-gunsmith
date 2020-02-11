import HTTP from './http'
import router from './router'

export default {
  namespaced: true,
  state: {
    availableAttachments: [],

    weapon: {
      title: "ADAR 2-15",
      src: "https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/3/3c/ADAR2-15Image.png?version=5ce4ce8faa56a1c54bdb1cbab889f0d0",
    },

    attachments: [],
    
    alert: null,
  },

  actions: {
    fetchAttachments({ commit }) {
      return HTTP().get('/attachments')
      .then(({ data }) => {
        commit('setAvailableAttachments', data.data[0])
      })
    }
  },

  getters: {

  },

  mutations: {
    // Weapon selector
    setWeaponTitle(state, title) {
      state.weapon.title = title
    },
    setWeaponSrc(state, src) {
      state.weapon.src = src
    },

    // Attachments selector
    setAvailableAttachments(state, availableAttachments) {
      state.availableAttachments = availableAttachments
    },
    addAttachment(state, attachment) {
      state.attachments.push(attachment)
    },
    deleteAttachment(state, attachment) {
      let index = state.attachments.indexOf(attachment)
      state.attachments.splice(index, 1)
    },
    updateAlert(state, item) {
      let message = item + ' has been added'
      state.alert = message;
    },
  },
}