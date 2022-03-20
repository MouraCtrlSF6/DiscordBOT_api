//Backend index.js
require('dotenv').config()

const config = require('./config/systemConfiguration')
const app = config()
const PORT = process.env.PORT

app.listen(PORT || 3000, (err) => {
  err
    ? console.log(err)
    : console.log(`Server running on port ${PORT}`)
})