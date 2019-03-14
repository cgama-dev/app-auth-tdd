const routes = require('express').Router()

const UserController = require('./app/controllers/User')

const { authorized, isAdmin } = require('./app/middlewares/auth')

// routes.get('/users', UserController.query)
routes.post('/users/authenticate', UserController.authenticate)

routes.get('/users/dashboard', authorized, (req, res) => {
    res.status(200).send()
})
routes.get('/users/restricted', isAdmin, (req, res) => {
    res.status(200).send()
})


module.exports = routes