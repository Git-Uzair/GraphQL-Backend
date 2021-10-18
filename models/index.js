'use strict'
const connect = require('knex')
const { Client, Connection } = require('pg')
const config = require('../config.json')


if (config.IS_PRODUCTION) {
  // TODO - Port Authetication work to be done at the end.
  const client = new Client(config.SQL)
  try {
    var db = connect({ client: 'pg', connection: config.SQL, pool: { min: 0 } })
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
} else {
  console.log('Starting local server.')
  const client = new Client(config.SQL)
  try {
    var db = connect({ client: 'pg', connection: config.SQL })
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}




module.exports = { db };