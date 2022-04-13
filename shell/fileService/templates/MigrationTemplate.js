require('dotenv').config()

class MigrationTemplate {
  formatClassName(name) {
    const alpha = name
      .toLowerCase()
      .replace(/[^A-Za-z]/gi,' ')
      .split(' ')

    return alpha.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }).join('')
  }

  new(migrationName) {
    const className = this.formatClassName(migrationName)

    return `require('dotenv').config()
const Database = require(\`../../infra/\${process.env.DATABASE}/queries\`)

class ${className} {
  constructor() {
    this.name = '${migrationName}'
  }
  
  async up() {
    const sql = '<sql_content>'

    return await Database.raw(sql)
  }
  
  async down() {
    const sql = '<sql_content>'

    return await Database.raw(sql)
  }
}

module.exports = new ${className}`
  }
}

module.exports = new MigrationTemplate