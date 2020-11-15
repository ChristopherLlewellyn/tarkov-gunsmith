'use strict'

const Env = use('Env')
const axios = use('axios')
const APP_NAME = process.env.APP_NAME || Env.get('APP_NAME')
const APP_VERSION = process.env.APP_VERSION || Env.get('APP_VERSION')

class TarkovDatabaseService {

  //* This method needs to be called before any other methods can be used
  // We need a JWT auth token in order to access the Tarkov-Database API
  // Tarkov-Database auth tokens last for a limited time - currently 30 minutes (16/04/2020)
  // A new token can be created using any of our previously existing tokens
  async getNewAuthToken() {
    let initialAuthToken = process.env.TARKOV_DATABASE_INITIAL_AUTH_TOKEN || Env.get('TARKOV_DATABASE_INITIAL_AUTH_TOKEN')
    axios.defaults.headers.common['Authorization'] = `Bearer ${initialAuthToken}`
    axios.defaults.headers.common['User-Agent'] = `${APP_NAME}/${APP_VERSION}`

    let token = await axios.get('https://api.tarkov-database.com/v2/token')
      .then(function(response) {
        return response.data.token
      })
      .catch(function(error) {
        console.log(error)
      })

    return token
  }

  //* Returns all item kinds (types)
  async getItemKinds(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.defaults.headers.common['User-Agent'] = `${APP_NAME}/${APP_VERSION}`

    let kinds = await axios.get('https://api.tarkov-database.com/v2/item')
      .then(function(response) {
        return response.data.kinds
      })
      .catch(function(error) {
        console.log(error)
      })

    return kinds
  }

  //* Returns all items of a given kind (type) e.g. armor
  // A maximum of 100 items can be returned per query, so multiple queries need to be made for certain kinds of items
  // The total number of items of a certain kind is provided in the query response
  // If not every item is returned in the first query, we repeatedly make queries and adjust the offset parameter
  // until every item has been returned
  async getItemsByKind(token, kind) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.defaults.headers.common['User-Agent'] = `${APP_NAME}/${APP_VERSION}`

    let data = await axios.get(`https://api.tarkov-database.com/v2/item/${kind}?limit=100`)
      .then(function(response) {
        return response.data
      })
      .catch(function(error) {
        console.log(error)
      })
    let items = data.items
    
    // If not every item is returned, adjust the offset parameter and make another query
    if (items.length < data.total) {
      for (let totalReturned = items.length; totalReturned < data.total; totalReturned++) {
        data = await axios.get(`https://api.tarkov-database.com/v2/item/${kind}?limit=100&offset=${totalReturned}`)
          .then(function(response) {
            return response.data
          })
          .catch(function(error) {
            console.log(error)
          })
        
        // Spread operator (...) adds all the items in data.items to the end of the items array
        // (rather than appending an array to an array) 
        items.push(...data.items)

        // If totalReturned is greater than or equal to data.total, then all items have been returned
        totalReturned += data.items.length
      }
    }

    return items
  }

  //* Returns all modifications (attachments) with their slots and compatibility
  async getModifications(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.defaults.headers.common['User-Agent'] = `${APP_NAME}/${APP_VERSION}`

    // Get each kind (type) of item
    // getItemKinds() returns an object of objects
    let kindsObject = await this.getItemKinds(token)
    // Filter for modification kinds
    let modificationKinds = Object.keys(kindsObject).filter(kind => kind.includes('modification'))

    // We also want magazines
    modificationKinds.push('magazine')

    // Get the attachments for every type of modification (+ magazines)
    let modifications = []
    for (let modificationKind of modificationKinds) {
      let items = await this.getItemsByKind(token, modificationKind)
      modifications.push(...items)
    }

    return modifications
  }
}

module.exports = new TarkovDatabaseService()
