const fetch = require('node-fetch')
const PORT = process.env.PORT || 3000
const app = require('../app')
const request = require('supertest')

let BASE_URL = `http://localhost:${PORT}/` 

describe('Test the root path', () => {
    test('It should response the GET method', () => {
		return request(app)
			.get('/api/v1')
			.then((res) => {
            	expect(res.statusCode).toBe(200)
        	})
    })
})
