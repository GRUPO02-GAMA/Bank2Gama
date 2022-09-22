const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./src/routes/routes')
const swaggerUI = require('swagger-ui-express')
const swaggerFile = require('./swagger.json')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 8080

app.use(cors())

app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use('/api', routes)

app.use(express.static('public'))

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})
