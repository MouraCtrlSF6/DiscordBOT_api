require('dotenv').config()
const Database = require(`../../infra/${process.env.DATABASE}/queries`)

class CreateCommandsSchema {
  constructor() {
    this.name = '2_create_commandsSchema'
  }
  
  async up() {
    const sql = `CREATE TABLE IF NOT EXISTS commands (
        id SERIAL PRIMARY KEY,
        callable VARCHAR(20) NOT NULL,
        description TEXT NOT NULL,
        exec TEXT
    );`

    return await Database.raw(sql)
  }
  
  async down() {
    const sql = 'DROP TABLE IF EXISTS commands;'
    return await Database.raw(sql)
  }
}

module.exports = new CreateCommandsSchema