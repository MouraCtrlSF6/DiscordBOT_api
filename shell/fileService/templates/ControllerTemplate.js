class ControllerTemplate {
  new(controllerName) {
    return `const Model = require('../../app/models/Model')
const execController = require('../../app/controllers/Controller')
const Controller = execController()
const mainModel = new Model('<table_name>', '<table_main_identifier>', '<not_required_fields>')

class ${controllerName} extends Controller {
  constructor(app, modelName) {
    super(app, modelName)

    this.setRoutes({
      index: '/index',
      show: '/show/:slug',
      store: '/store',
      update: '/update/:slug',
      remove: '/remove/:slug'
    })
  }

  routes() {}
}
  
module.exports = app => new ${controllerName}(app, mainModel).routes()`
  }
}

module.exports = new ControllerTemplate