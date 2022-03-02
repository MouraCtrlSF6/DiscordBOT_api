const Model = require('../../app/models/Model')
const execController = require('../../app/controllers/Controller')
const Controller = execController()

const CommandsModel = new Model('commands', 'id')

class ExampleController extends Controller {
  constructor(app, modelName) {
    super(app, modelName)

    this.setRoutes({
      index: '/commands/index',
      show: '/commands/show/:id',
      store: '/commands/store',
      update: '/commands/update/:id',
      remove: '/commands/remove/:id'
    })
  }

  routes() {}
}

module.exports = app => new ExampleController(app, CommandsModel).routes()