const routes = require('express').Router()

const UserController = require('../app/controllers/UserController')
const MessageController = require('../app/controllers/MessageController')

const authMiddleware = require('../app/middlewares/auth')

routes.post('/users', UserController.create)
routes.post('/users/authenticate', UserController.authenticate)

// Authenticated routes
routes.use(authMiddleware)

routes.post('/message', MessageController.create)
routes.get('/message', MessageController.findAll)

module.exports = routes
