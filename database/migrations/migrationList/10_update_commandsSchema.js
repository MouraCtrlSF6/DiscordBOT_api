require('dotenv').config()
const Database = require(`../../infra/${process.env.DATABASE}/queries`)

class AddIntoCommandsSchema {
  constructor() {
    this.name = '10_update_commandsSchema'
  }
  
  async up() {
    const sql = `
      UPDATE commands
      SET description = 'Plays the music provided as argument.\nOptions:\n--play music_url: Searches for the provided music url and play it.\n--play music_name: Searches for the music name and opens a list with the 5 first results.\n--play queue:queue_name: Plays the requested queue from your saved queues.'
      WHERE callable = '--play'
    `

    return await Database.raw(sql)
  }
  
  async down() {
    const sql = `
      UPDATE commands
      SET description = 'Play music provided as argument'
      WHERE callable = '--play'
    `
    return await Database.raw(sql)
  }
}

module.exports = new AddIntoCommandsSchema