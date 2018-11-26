const fetch = require('node-fetch')
const server = require('./index').server
const PORT = require('./index').PORT

let BASE_URL = `http://localhost:${PORT}/` 

test('hello world', () => {
	expect.assertions(2)
	return fetch(BASE_URL)
		.then(res => {
			expect(res.status).toBe(200)
			return res.text()
		})
		.then(text => {
			expect(text).toBe('Hello World!')
		})
})

afterAll(() => {
	server.close()
})
