require('dotenv').config()
const { Pool: Conection } = require('pg')
const SSL = process.env.SSL_ENABLE
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_BASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
}

if(SSL) {
  config.ssl = {
    rejectUnauthorized: false
  }
}

module.exports = new Conection(config)