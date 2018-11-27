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
            expect(typeof resJson).toBe('object')
            expect(resJson).toHaveLength(3)
            let first_user = resJson[0]
            expect(first_user.id).toBe(1)
            expect(first_user.name).toBe('Admin')
        })
})

test('GET single user with valid ID', () => {
    expect.assertions(7)
    return fetch(`${BASE_URL}/2`)
        .then(res => {
            expect(res.status).toBe(200)
            return res.json()
        })
        .then(resJson => {
            expect(typeof resJson).toBe('object')
            expect(resJson.id).toBe(2)
            expect(resJson.name).toBe('Gianmarco')
            expect(resJson.surname).toBe('Digiacomo')
            expect(resJson.mail).toBe('giandigia@email.com')
            expect(resJson.role).toBe('student')
        })
})

test('GET single user with non-existent ID', () => {
    expect.assertions(1)
    return fetch(`${BASE_URL}/0`)
        .then(res => {
            expect(res.status).toBe(404)
        })
})

afterAll(() => {
	server.close()
})