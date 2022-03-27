require('dotenv').config()
const Database = require(`../../database/infra/${process.env.DATABASE}/queries`)

class DataValidator {
  validationResult(validationName, validation) {
    const validations = [
      { 
        name: 'storeData',
        valid: !validation.length,
        status: 400,
        errorsOn: validation,
        description: `Check if the following fields are empty: ${validation} .`
      },
      { 
        name: 'updateData',
        valid: !validation.length,
        status: 400,
        errorsOn: validation,
        description: `Validation failed on fields: ${validation} .`
      },
      {
        name: 'showData',
        valid: !validation.length,
        status: 400,
        errorsOn: validation,
        description: `Validation failed on fields: ${validation} .`
      },  
      {
        name: 'ERROR',
        valid: false,
        status: 500,
        errorsOn: validation,
        description: validation.message
      }
    ]

    return validations.find(validation => validation.name === validationName)
  }

  async validateStoreData(tableName, notRequired, payload) { 
    try {
      const tableColumns = await Database.getColumns(tableName)
      const payloadKeys = Object.keys(payload)
      notRequired = Array.isArray(notRequired) ? notRequired : [notRequired]
  
      const validation = tableColumns.filter(column => {
        if(!payloadKeys.includes(column) && !notRequired.includes(column)) return column
        if(!String(payload[column]).length && !notRequired.includes(column)) return column
      })

      return this.validationResult('storeData', validation)
    } catch(error) {
      return this.validationResult('ERROR', error)
    }
  }

  async validateUpdateData(tableName, notRequired, payload) {
    try {
      const tableColumns = await Database.getColumns(tableName)
      const payloadKeys = Object.keys(payload)
      notRequired = Array.isArray(notRequired) ? notRequired : [notRequired]
  
      const validation = payloadKeys.filter(key => {
        if(!String(payload[key]).length && !notRequired.includes(key)) return key
        if(!tableColumns.includes(key)) return key
      })

      return this.validationResult('updateData', validation)
    } catch(error) {
      return this.validationResult('ERROR', error)
    }
  }

  async validateShowData(tableName, payload) {
    try {
      const tableColumns = await Database.getColumns(tableName)
      const payloadKeys = Object.keys(payload)
  
      const validation = payloadKeys.filter(key => {
        if(!tableColumns.includes(key)) 
          return key
      })

      return this.validationResult('showData', validation)
    } catch(error) {
      return this.validationResult('ERROR', error)
    }
  }
}

module.exports = new DataValidator