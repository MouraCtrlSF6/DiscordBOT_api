const Model = require('../../app/models/Model')
const execController = require('../../app/controllers/Controller')
const Controller = execController()

const ServersModel = new Model('servers')

class ServersController extends Controller {
  constructor(app, modelName) {
    super(app, modelName)

    this.setRoutes({
      index: '/servers/index',
      show: '/servers/show/:guild_id',
      store: '/servers/store',
      update: '/servers/update/:guild_id',
      remove: '/servers/remove/:guild_id'
    })
  }

  routes() {}
}

module.exports = app => new ServersController(app, ServersModel).routes()