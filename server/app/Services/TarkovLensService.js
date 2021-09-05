'use strict'

const Env = use('Env')
const axios = use('axios')
const APP_NAME = process.env.APP_NAME || Env.get('APP_NAME')
const APP_VERSION = process.env.APP_VERSION || Env.get('APP_VERSION')

// Used to get price and image info from TarkovLens API instead of Tarkov-Market.
class TarkovLensService {
  //* Returns all items of a given kind (type) e.g. firearm
  async getItemsByKind(kind) {
    axios.defaults.headers.common['User-Agent'] = `${APP_NAME}/${APP_VERSION}`

    let data = await axios.get(`https://api.tarkovlens.com/item/kind/${kind}`)
      .then(function(response) {
        return response.data
      })
      .catch(function(error) {
        console.log(error)
      })
    
      return data
  }

  //* Returns a list of item kinds e.g. ["Ammunition", "Armor", "Firearm"] etc
  async getItemKinds() {
    axios.defaults.headers.common['User-Agent'] = `${APP_NAME}/${APP_VERSION}`

    let data = await axios.get(`https://api.tarkovlens.com/item/kind`)
      .then(function(response) {
        return response.data
      })
      .catch(function(error) {
        console.log(error)
      })
    
      return data
  }

  //* Returns basic info about all items including market prices, images etc
  async getItemsBasicInfo() {
    axios.defaults.headers.common['User-Agent'] = `${APP_NAME}/${APP_VERSION}`

    let data = await axios.get(`https://api.tarkovlens.com/item`)
      .then(function(response) {
        return response.data
      })
      .catch(function(error) {
        console.log(error)
      })
    
      return data
  }
}

module.exports = new TarkovLensService()
