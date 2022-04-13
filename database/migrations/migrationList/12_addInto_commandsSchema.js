require('dotenv').config()
const Database = require(`../../infra/${process.env.DATABASE}/queries`)

class AddintoCommandsschema {
  constructor() {
    this.name = '12_addInto_commandsSchema'
  }
  
  async up() {
    const sql = `
      INSERT INTO commands (
        callable,
        description,
        exec
      ) VALUES (
        '--shuffle',
        'Organizes current queue in a random order.',
        '(args) => this.shuffle(args)'
      );
    `

    return await Database.raw(sql)
  }
  
  async down() {
    const sql = `
      DELETE FROM commands
      WHERE callable IN (
        '--shuffle'
      );
    `

    return await Database.raw(sql)
  }
}

module.exports = new AddintoCommandsschema