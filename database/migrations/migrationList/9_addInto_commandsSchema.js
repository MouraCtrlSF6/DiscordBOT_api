require('dotenv').config()
const Database = require(`../../infra/${process.env.DATABASE}/queries`)

class AddIntoCommandsSchema {
  constructor() {
    this.name = '9_addInto_commandsSchema'
  }
  
  async up() {
    const sql = `
      INSERT INTO commands (
        callable,
        description,
        exec
      ) 
      VALUES (
        '--info',
        'Displays information about the requested object.\nOptions:\n--info {id}: Displays information about the requested track.\n--info current: Displays information about the current track.\n--info queues: Displays information about all your saved queues.\n--info queues:queue_name: Displays information about the requested queue from your queues playlist.',
        '(args) => this.info(args)'
      );
    `

    return await Database.raw(sql)
  }
  
  async down() {
    const sql = `
      DELETE FROM commands 
      WHERE callable IN (
        '--info'
      )`
    return await Database.raw(sql)
  }
}

module.exports = new AddIntoCommandsSchema