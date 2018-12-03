const app = require('../app')
const request = require('supertest')

describe('Test the root path', () => {
    test('It should response the GET method', () => {
		return request(app)
			.get('/api/v1')
			.then((res) => {
            	expect(res.statusCode).toBe(200)
        	})
    })
})
