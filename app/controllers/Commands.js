const Model = require('../../app/models/Model')
const execController = require('../../app/controllers/Controller')
const Controller = execController()

const CommandsModel = new Model('commands', 'id')

class ExampleController extends Controller {
  constructor(app, modelName) {
    super(app, modelName)

    this.setRoutes({
      index: '/index',
      show: '/show/:id',
      store: '/store',
      update: '/update/:id',
      remove: '/remove/:id'
    })
  }

  routes() {}
}

module.exports = app => new ExampleController(app, CommandsModel).routes()