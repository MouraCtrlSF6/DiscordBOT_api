require('dotenv').config()
const Database = require(`../../infra/${process.env.DATABASE}/queries`)

class AddintoCommandsschema {
  constructor() {
    this.name = '13_addInto_commandsSchema'
  }
  
  async up() {
    const sql = `
    INSERT INTO commands (
      callable,
      description,
      exec
    ) VALUES (
      '--add',
      'Adds a specified track id to an existing saved queue.\n Example:\n  --add queue_name:track_id',
      '(args) => this.add(args)'
    );
  `

    return await Database.raw(sql)
  }
  
  async down() {
    const sql = `
    DELETE FROM commands
    WHERE callable IN (
      '--add'
    );
  `

    return await Database.raw(sql)
  }
}

module.exports = new AddintoCommandsschema