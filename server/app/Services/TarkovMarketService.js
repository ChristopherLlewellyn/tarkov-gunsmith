'use strict'

const Env = use('Env')
const axios = use('axios')
const TARKOV_MARKET_API_KEY = process.env.TARKOV_MARKET_API_KEY || Env.get('TARKOV_MARKET_API_KEY')

// Limit of 300 requests per minute

class TarkovMarketService {

  async getAllItems() {
    axios.defaults.headers.common['x-api-key'] = TARKOV_MARKET_API_KEY

    let items = await axios.get('https://tarkov-market.com/api/v1/items/all')
      .then(function(response) {
        return response.data
      })
      .catch(function(error) {
        console.log(error)
      })

    return items
  }
}

module.exports = new TarkovMarketService()
