const fetch = require('node-fetch')
const server = require('../index').server
const PORT = require('../index').PORT

let BASE_URL = `http://localhost:${PORT}/api/v1/users` 

test('GET all users', () => {
    expect.assertions(5)
    return fetch(BASE_URL)
        .then(res => {
            expect(res.status).toBe(200)
            return res.json()
        })
        .then(resJson => {
            expect(resJson).toBeInstanceOf('array')
            expect(resJson).toHaveLength(465)
            let first_user = resJson[0]
            expect(first_user.id).toBe(1)
            expect(first_user.name).toBe('Admin')
        })
})

afterAll(() => {
	server.close()
})