const express = require('express')
const Home = require('./../controllers/Home')

const route = express.Router()

route.get('/', Home.index)

module.exports = route