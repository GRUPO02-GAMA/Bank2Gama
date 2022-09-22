const express = require('express')
const routes = express.Router()
const authenticate = require('../middlewares/global.middleware')

const clientsController = require('../controllers/clients.controller')
const loginController = require('../controllers/login.controller')
const accountsController = require('../controllers/accounts.controller')

routes.get('/client', authenticate, clientsController.findAll)
routes.post('/client', authenticate, clientsController.create)
routes.post('/login', loginController.login)
routes.post('/logout', authenticate, loginController.logout)
routes.get('/account', authenticate, accountsController.findAll)

module.exports = routes
