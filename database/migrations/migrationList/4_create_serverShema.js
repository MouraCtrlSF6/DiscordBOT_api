require('dotenv').config()
const Database = require(`../../infra/${process.env.DATABASE}/queries`)

class ServerSchema {
  constructor() {
    this.name = '4_create_serverShema'
  }
  
  async up() {
    const sql = `CREATE TABLE IF NOT EXISTS servers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        guild_id VARCHAR(255) NOT NULL
    );`

    return await Database.raw(sql)
  }
  
  async down() {
    const sql = 'DROP TABLE IF EXISTS servers;'
    return await Database.raw(sql)
  }
}

module.exports = new ServerSchema