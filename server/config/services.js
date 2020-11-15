'use strict'

/*
|--------------------------------------------------------------------------
| Services Configuration
|--------------------------------------------------------------------------
|
| This is general purpose file to define configuration for multiple services.
| The below config is for the ally provider. Make sure to save it inside
| config/services.js file.
|
| Happy Coding :)
|
*/

const Env = use('Env')

module.exports = {
  ally: {
    /*
    |--------------------------------------------------------------------------
    | Facebook Configuration
    |--------------------------------------------------------------------------
    |
    | You can access your application credentials from the facebook developers
    | console. https://developers.facebook.com/apps
    |
    */
    facebook: {
      clientId: process.env.FB_CLIENT_ID || Env.get('FB_CLIENT_ID'),
      clientSecret: process.env.FB_CLIENT_SECRET || Env.get('FB_CLIENT_SECRET'),
      redirectUri: `${process.env.APP_URL || Env.get('APP_URL')}/api/authenticated/facebook`
    },

    /*
    |--------------------------------------------------------------------------
    | Google Configuration
    |--------------------------------------------------------------------------
    |
    | You can access your application credentials from the google developers
    | console. https://console.developers.google.com
    |
    */
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || Env.get('GOOGLE_CLIENT_ID'),
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || Env.get('GOOGLE_CLIENT_SECRET'),
      redirectUri: `${process.env.APP_URL || Env.get('APP_URL')}/api/authenticated/google`
    },

    /*
    |--------------------------------------------------------------------------
    | Github Configuration
    |--------------------------------------------------------------------------
    |
    | You can access your application credentials from the github developers
    | console. https://github.com/settings/developers
    |
    */
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || Env.get('GITHUB_CLIENT_ID'),
      clientSecret: process.env.GITHUB_CLIENT_SECRET || Env.get('GITHUB_CLIENT_SECRET'),
      redirectUri: `${process.env.APP_URL || Env.get('APP_URL')}/api/authenticated/github`
    },

    /*
     |--------------------------------------------------------------------------
     | Instagram Configuration
     |--------------------------------------------------------------------------
     |
     | You can access your application credentials from the instagram developers
     | console. https://www.instagram.com/developer/
     |
     */
    instagram: {
      clientId: process.env.INSTAGRAM_CLIENT_ID || Env.get('INSTAGRAM_CLIENT_ID'),
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET || Env.get('INSTAGRAM_CLIENT_SECRET'),
      redirectUri: `${process.env.APP_URL || Env.get('APP_URL')}/api/authenticated/instagram`
    },

    /*
     |--------------------------------------------------------------------------
     | Foursquare Configuration
     |--------------------------------------------------------------------------
     |
     | You can access your application credentials from the Foursquare developers
     | console. https://developer.foursquare.com/
     |
     */
    foursquare: {
      clientId: process.env.FOURSQUARE_ID || Env.get('FOURSQUARE_ID'),
      clientSecret: process.env.FOURSQUARE_SECRET || Env.get('FOURSQUARE_SECRET'),
      redirectUri: `${process.env.APP_URL || Env.get('APP_URL')}/api/authenticated/foursquare`
    },
    
    /*
     |--------------------------------------------------------------------------
     | Discord Configuration
     |--------------------------------------------------------------------------
     |
     | You can access your application credentials from the Discord developers
     | console. https://discordapp.com/developers/applications/
     |
     */
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID || Env.get('DISCORD_CLIENT_ID'),
      clientSecret: process.env.DISCORD_CLIENT_SECRET || Env.get('DISCORD_CLIENT_SECRET'),
      redirectUri: `${process.env.APP_URL || Env.get('APP_URL')}/authenticated/discord`
    }
  }
}
