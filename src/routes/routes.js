const express = require("express")
const routes = express.Router()
const authenticate = require("../middlewares/global.middleware")

const clientsController = require("../controllers/clients.controller")
const loginController = require("../controllers/login.controller")
const accountsController = require("../controllers/accounts.controller")
const usersController = require("../controllers/users.controller")
const operationsController = require("../controllers/operations.controller")

routes.get("/client", authenticate, clientsController.findAll)
routes.post("/client", authenticate, clientsController.create)
routes.post("/login", loginController.login)
routes.post("/logout", authenticate, loginController.logout)
routes.get("/account", authenticate, accountsController.findAll)
routes.get("/user", authenticate, usersController.user)
routes.get("/operations", authenticate, operationsController.findAll)

module.exports = routes
