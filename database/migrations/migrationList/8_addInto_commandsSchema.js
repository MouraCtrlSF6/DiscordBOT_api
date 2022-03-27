require('dotenv').config()
const Database = require(`../../infra/${process.env.DATABASE}/queries`)

class AddIntoCommandsSchema {
  constructor() {
    this.name = '8_addInto_commandsSchema'
  }
  
  async up() {
    const sql = `
      INSERT INTO commands (
        callable,
        description,
        exec
      ) 
      VALUES (
        '--save',
        'Saves the current queue into your queues playlist.',
        '(args) => this.save(args)'
      );
    `

    return await Database.raw(sql)
  }
  
  async down() {
    const sql = `
      DELETE FROM commands 
      WHERE callable IN (
        '--save'
      )`
    return await Database.raw(sql)
  }
}

module.exports = new AddIntoCommandsSchema