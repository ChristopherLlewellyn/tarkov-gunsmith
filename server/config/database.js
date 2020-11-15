'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

/** @type {import('@adonisjs/ignitor/src/Helpers')} */
const Helpers = use('Helpers')

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: process.env.DB_CONNECTION || Env.get('DB_CONNECTION', 'mysql'),

  /*
  |--------------------------------------------------------------------------
  | Sqlite
  |--------------------------------------------------------------------------
  |
  | Sqlite is a flat file database and can be a good choice for a development
  | environment.
  |
  | npm i --save sqlite3
  |
  */
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: Helpers.databasePath(`${process.env.DB_DATABASE || Env.get('DB_DATABASE', 'development')}.sqlite`)
    },
    useNullAsDefault: true,
    debug: process.env.DB_DEBUG || Env.get('DB_DEBUG', false)
  },

  /*
  |--------------------------------------------------------------------------
  | MySQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for MySQL database.
  |
  | npm i --save mysql
  |
  */
  mysql: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST || Env.get('DB_HOST', 'localhost'),
      port: process.env.DB_PORT || Env.get('DB_PORT', ''),
      user: process.env.DB_USER || Env.get('DB_USER', 'root'),
      password: process.env.DB_PASSWORD || Env.get('DB_PASSWORD', ''),
      database: process.env.DB_DATABASE || Env.get('DB_DATABASE', 'tarkov_gunsmith')
    },
    debug: process.env.DB_DEBUG || Env.get('DB_DEBUG', false)
  },

  /*
  |--------------------------------------------------------------------------
  | PostgreSQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for PostgreSQL database.
  |
  | npm i --save pg
  |
  */
  pg: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || Env.get('DB_HOST', 'localhost'),
      port: process.env.DB_PORT || Env.get('DB_PORT', ''),
      user: process.env.DB_USER || Env.get('DB_USER', 'root'),
      password: process.env.DB_PASSWORD || Env.get('DB_PASSWORD', ''),
      database: process.env.DB_DATABASE || Env.get('DB_DATABASE', 'adonis')
    },
    debug: process.env.DB_DEBUG || Env.get('DB_DEBUG', false)
  }
}
