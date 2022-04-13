const FileService = require("./fileService.js")
const [method, args] = process.argv.slice(2)

async function exec(method, parameter) {
  return await FileService[method](parameter) 
}

exec(method, args)
  .then((manager) => {
    console.log()
    console.log(manager)
    process.exit()
  })
  .catch((error) => {
    console.error()
    console.error(error)
    process.exit()
  })

