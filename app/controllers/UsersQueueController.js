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
      userQueues: '/queues/user/:user_id',
      listByName: '/queues/name/:name'
    })
  }

  routes() {
    this.app.route( this.getRoute( 'userQueues' ) ).get(async (request, response) => {
      try {
        const { params } = request
        const data = await this.Model.show(params)
                
        return response
          .status(200)
          .json({status: 200, data: data.rows[0] })
      } catch(error) {
        console.error(error.message)
        return response
          .status(500)
          .json({status: 500, data: error.message})
      }
    })

    this.app.route( this.getRoute( 'listByName' ) ).get(async (request, response) => {
      try {
        const { params } = request
        const data = await this.Model.show(params)
                
        return response
          .status(200)
          .json({status: 200, data: data.rows[0] })
      } catch(error) {
        console.error(error.message)
        return response
          .status(500)
          .json({status: 500, data: error.message})
      }
    })

    this.overrides(this.getRoute('store'))
    this.app.route(this.getRoute('store')).post(async (request, response) => {
      try {
        console.log("Found the new one")
        const payload = request.body
        
        const repeatedName = await this.Model.show({
          user_id: payload.user_id,
          name: payload.name
        })

        if(!!repeatedName) {
          return response
          .status(400)
          .json({status: 400, data: "You already have a playlist with the same name"})
        }
        
        return response
          .status(200)
          .json({status: 200, data: payload})
      } catch(error) {
        console.error(error.message)
        return response
          .status(error.status || 500)
          .json({status: error.status || 500, data: error.message})
      }
    })
  }
}

module.exports = app => new UsersQueueController(app, UsersQueueModel).routes()