require('dotenv').config()
const Database = require(`../../infra/${process.env.DATABASE}/queries`)

class AddintoCommandsschema {
  constructor() {
    this.name = '11_addInto_commandsSchema'
  }
  
  async up() {
    const sql = `
      INSERT INTO commands (
        callable,
        description,
        exec
      ) 
      VALUES (
        '--add',
        'Adds a new track into a specified playlist.\n Usage:\n  --add queue_name:queue: Appends the current queue into the specified saved queue.\n  --add queue_name:track_id: Searches for the specified track inside the current queue and appends it to the saved queue.',
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
    );`

    return await Database.raw(sql)
  }
}

module.exports = new AddintoCommandsschema