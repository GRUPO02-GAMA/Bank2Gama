const express = require("express")
const routes = express.Router()

const clientsController = require("../controllers/clients.controller")
const loginController = require("../controllers/login.controller")

routes.get('/client', clientsController.findAll)
routes.post('/client', clientsController.create)
routes.post('/login', loginController.login)

module.exports = routes