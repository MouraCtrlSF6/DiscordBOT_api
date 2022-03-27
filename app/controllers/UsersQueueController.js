const Model = require('../../app/models/Model')
const execController = require('../../app/controllers/Controller')
const Controller = execController()

const UsersQueueModel = new Model('usersqueue',
  [
    'size', 
    'duration', 
    'created_at', 
    'updated_at'
  ]
)

class UsersQueueController extends Controller {
  constructor(app, modelName) {
    super(app, modelName)

    this.setRoutes({
      index: '/queues/index',
      show: '/queues/show/:id',
      store: '/queues/store',
      update: '/queues/update/:id',
      remove: '/queues/remove/:id',
      userQueues: '/queues/user/:user_id'
    })
  }

  routes() {
    this.app.route( this.getRoute( 'userQueues' ) ).get(async (request, response) => {
      try {
        const { params } = request
        const data = await this.modelName.show(params)
        
        return response
          .status(200)
          .json({status: 200, data })
      } catch(error) {
        console.error(error.message)
        return response
          .status(500)
          .json({status: 500, data: error.message})
      }
    })
  }
}

module.exports = app => new UsersQueueController(app, UsersQueueModel).routes()