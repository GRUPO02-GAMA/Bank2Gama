const express = require("express")
const routes = express.Router()

const clientsController = require("../controllers/clients.controller")
const loginController = require("../controllers/login.controller")
const accountsController = require("../controllers/accounts.controller")
const usersController = require("../controllers/users.controller")

routes.get("/client", clientsController.findAll)
routes.post("/client", clientsController.create)
routes.post("/login", loginController.login)
routes.post("/logout", loginController.logout)
routes.get("/account", accountsController.findAll)
routes.get("/user", usersController.user)

module.exports = routes
