const express = require('express')
const app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())

let v1Router = require('./routes/v1/routes').router

app.use('/api/v1', v1Router)

module.exports = app
