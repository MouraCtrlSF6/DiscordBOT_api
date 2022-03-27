require('dotenv').config()
const DataService = require('../validators/DataValidator')
const Database = require(`../../database/infra/${process.env.DATABASE}/queries`)
const NOT_REQUIRABLE = ['id']

class Model {
  constructor(tableName, notRequired = [...NOT_REQUIRABLE]) {
    this.tableName = tableName.toLowerCase()
    this.notRequired = notRequired.includes(...NOT_REQUIRABLE) 
      ? notRequired
      : [...notRequired, ...NOT_REQUIRABLE] 
  }

  index() {
    return Database.index(this.tableName)
  }

  async store(payload) {
    const validPayload = await DataService.validateStoreData(
      this.tableName, 
      this.notRequired, 
      payload
    )

    if(!validPayload.valid) {
      const error = new Error(validPayload.description)
      error.status = validPayload.status
      throw error
    }
        
    const storeInColumns = Object
      .keys(payload)
      .filter(column => !NOT_REQUIRABLE.includes(column))
      
    const orderedValues = storeInColumns.map(column => payload[column])
    const formattedValues = Object.keys(storeInColumns).map(index => `$${parseInt(index)+1}`)

    const queryData = {
      storeInColumns,
      orderedValues,
      formattedValues
    }

    return Database.store(this.tableName, queryData)
  }

  async update(set, where) {
    try {
      const validPayload = await DataService.validateUpdateData(
        this.tableName, 
        this.notRequired, 
        set
      )
      
      if(!validPayload.valid) {
        const error = new Error(validPayload.description)
        error.status = validPayload.status
        throw error
      }
      
      const updateEvent = await Database.update(this.tableName, set, where)

      if(!updateEvent.rowCount) {
        const error = new Error('Data row not found')
        error.status = 404
        throw error
      }
  
      return true
    } catch(e) {
      const error = new Error(e.message)
      error.status = 500
      throw error
    }
  }

  remove(where) {
    where = typeof where === 'object'
      ? where
      : {}

    return Database.remove(this.tableName, where)
  }

  async show(where) {
    where = typeof where === 'object'
      ? where
      : {}

    const validPayload = await DataService.validateShowData(
      this.tableName, 
      where
    )
    
    if(!validPayload.valid) {
      const error = new Error(validPayload.description)
      error.status = validPayload.status
      throw error
    }

    return Database.show(this.tableName, where)
  }
}

module.exports = Model