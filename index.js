const express = require('express')
const app = express()
var bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000

app.use(bodyParser.json())

let usersRouter = require('./routes/users')

app.use('/api/v1', usersRouter)

app.get('/', (req, res) => {
	res.send('Hello World!')
})

let server = app.listen(PORT, () => {
	console.log('Server listening on port ' + PORT)
})

module.exports = {server, PORT}
