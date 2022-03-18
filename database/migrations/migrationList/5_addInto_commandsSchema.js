require('dotenv').config()
const Database = require(`../../infra/${process.env.DATABASE}/queries`)

class AddIntoCommandsSchema {
  constructor() {
    this.name = '5_addInto_commandsSchema'
  }
  
  async up() {
    const sql = `
      INSERT INTO commands (
        callable,
        description,
        exec
      ) 
      VALUES (
        '--loop',
        'Loops a specified track or queue.\n   Options:\n      --loop current: Loops the current track\n      --loop {id}: Loops the correspondent track on queue\n      --loop queue: Puts the queue in loop.\n      --loop disable: Disable all loops.',
        '(args) => this.loop(args)'
      ), (
        '--seek',
        'Seek for a specific music in queue. Takes the music id as argument.',
        '(args) => this.seek(args)'
      );
    `

    return await Database.raw(sql)
  }
  
  async down() {
    const sql = `
      DELETE FROM commands 
      WHERE callable IN (
        '--loop', 
        '--seek'
      )`
    return await Database.raw(sql)
  }
}

module.exports = new AddIntoCommandsSchema