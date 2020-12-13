/** requires */
const express = require('express')
const DashAuth = require('./../middlewares/DashAuth')

/** controllers */
const Home = require('./../controllers/Home')
const User = require('./../controllers/User')
const Dashboard = require('./../controllers/Dashboard')

/** configs */
const route = express.Router()

/** routes */
route.get('/', Home.index)

route.get('/users', User.index)
route.get('/user/:id', User.getByID)

route.post('/user', User.create)

route.put('/user', User.update)

route.delete('/user/:id', User.delete)

route.post('/login', User.login)

route.get('/app', DashAuth, Dashboard.index)

module.exports = route