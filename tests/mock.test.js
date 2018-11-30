const fetch = require('node-fetch')
const PORT = process.env.PORT || 3000

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
