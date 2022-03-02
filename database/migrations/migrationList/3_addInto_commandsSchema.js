require('dotenv').config()
const Database = require(`../../infra/${process.env.DATABASE}/queries`)

class AddIntoCommandsSchema {
  constructor() {
    this.name = '3_addInto_commandsSchema'
  }
  
  async up() {
    const sql = `
      INSERT INTO commands (
        callable,
        description,
        exec
      ) VALUES 
      (
        '--help', 
        'Show all commands and their description',
        '() => this.list()'
      ),
      (
        '--play', 
        'Play music provided as argument',
        '(args) => this.play(args)'
      ),
      (
        '--solve',
        'Solves a simple mathematical expression',
        '(args) => this.solve(args)'
      ),
      (
        '--leave',
        'Order BOT to leave the voice channel and clears queue.',
        '(args) => this.leave(args)'
      ),
      (
        '--pause',
        'Pauses teh current music.',
        '() => this.pause()'
      ),
      (
        '--resume',
        'Resumes the current music',
        '() => this.resume()'
      ),
      (
        '--queue',
        'Show tracks listed on queue',
        '() => this.queue()'
      ),
      (
        '--stop',
        'Stops the current music and clears the track queue',
        '() => this.stop()'
      ),
      (
        '--skip',
        'Skips to the next track on queue.',
        '() => this.skip()'
      )
    `

    return await Database.raw(sql)
  }
  
  async down() {
    const sql = `
      DELETE FROM commands
      WHERE callable IN (
        '--help',
        '--play',
        '--solve',
        '--leave',
        '--pause',
        '--resume',
        '--queue',
        '--stop',
        '--skip'
      )
    `
    return await Database.raw(sql)
  }
}

module.exports = new AddIntoCommandsSchema