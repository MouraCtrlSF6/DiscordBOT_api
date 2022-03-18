require('dotenv').config()
const Database = require(`../../infra/${process.env.DATABASE}/queries`)

class AddIntoCommandsSchema {
  constructor() {
    this.name = '6_addInto_commandsSchema'
  }
  
  async up() {
    const sql = `
      INSERT INTO commands (
        callable,
        description,
        exec
      ) 
      VALUES (
        '--remove',
        'Removes a set of tracks from queue. Takes track IDs space separated as parameter.',
        '(args) => this.remove(args)'
      );
    `

    return await Database.raw(sql)
  }
  
  async down() {
    const sql = `
      DELETE FROM commands 
      WHERE callable IN (
        '--remove'
      )`
    return await Database.raw(sql)
  }
}

module.exports = new AddIntoCommandsSchema