const express = require('express')
const app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())

let usersRouter = require('./routes/users')

app.use('/api/v1', usersRouter)

app.get('/', (req, res) => {
	res.send('Hello World!')
})

module.exports = app
