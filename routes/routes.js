/** requires */
const express = require('express')

/** controllers */
const Home = require('./../controllers/Home')
const User = require('./../controllers/User')

/** configs */
const route = express.Router()

/** routes */
route.get('/', Home.index)

route.get('/users', User.index)
route.get('/user/:id', User.getByID)

route.post('/user', User.create)

route.put('/user', User.update)

module.exports = route