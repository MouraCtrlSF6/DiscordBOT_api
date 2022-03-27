require('dotenv').config()
const Database = require(`../../infra/${process.env.DATABASE}/queries`)

class UsersQueuesSchema {
  constructor() {
    this.name = '7_create_UserQueuesSchema'
  }
  
  async up() {
    const sql = `
      CREATE TABLE IF NOT EXISTS UsersQueue (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        size INT,
        duration VARCHAR(255),
        data TEXT NOT NULL,
        created_at DATE DEFAULT now(),
        updated_at DATE DEFAULT now()
      );
    `

    return await Database.raw(sql)
  }
  
  async down() {
    const sql = 'DROP TABLE IF EXISTS UsersQueue;'
    return await Database.raw(sql)
  }
}

module.exports = new UsersQueuesSchema