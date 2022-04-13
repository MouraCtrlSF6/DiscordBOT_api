require('dotenv').config()
const Database = require(`../../infra/${process.env.DATABASE}/queries`)

class AddintoCommandsschema {
  constructor() {
    this.name = '11_addInto_commandsSchema'
  }
  
  async up() {
    const sql = '<sql_content>'

    return await Database.raw(sql)
  }
  
  async down() {
    const sql = '<sql_content>'

    return await Database.raw(sql)
  }
}

module.exports = new AddintoCommandsschema