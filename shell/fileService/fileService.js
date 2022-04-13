const fs = require("fs")
const ControllerTemplate = require("./templates/ControllerTemplate.js")
const MigrationTemplate = require("./templates/MigrationTemplate.js")

class FileService {
  makeFile(path, name, template) {
    return new Promise((resolve, reject) => {
      fs.writeFile(`${path}/${name}.js`, template, (err) => {
        if(err) {
          reject(err)
        }
        resolve(true)
      })
    })  
  }

  async controller(controllerName) {
    try {
      await this.makeFile(
        './app/controllers', 
        controllerName, 
        ControllerTemplate.new(controllerName)
      )
      return "Controller successfully created."
    } catch(e) {
      console.error("An error has ocurred: ", e.message)
      throw e
    }
  }

  async migration(migrationName) {
    try {
      await this.makeFile(
        './database/migrations/migrationList', 
        migrationName, 
        MigrationTemplate.new(migrationName)
      )
      return "Migration successfully created."
    } catch(e) {
      console.error("An error has ocurred: ", e)
      throw e
    }
  }
}

module.exports = new FileService