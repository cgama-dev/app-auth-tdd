const routes = require('express').Router()

const UserController = require('./app/controllers/User')

const { authorized } = require('./app/middlewares/auth')

routes.post('/users/authenticate', UserController.authenticate)

routes.get('/users/dashboard', authorized, (req, res) => {

    // console.log(req.headers['authorization'].split("Bearer",''))
    res.status(200).send()
})

module.exports = routes