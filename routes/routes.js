const express = require('express')

/** controllers */
const Home = require('./../controllers/Home')
const User = require('./../controllers/User')

const route = express.Router()

/** routes */
route.get('/', Home.index)

route.post('/user', User.store)

module.exports = route