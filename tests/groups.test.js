const fetch = require('node-fetch')
const server = require('../index').server
const PORT = require('../index').PORT

let BASE_URL = `http://localhost:${PORT}/api/v1/groups`

test('GET all groups', () => {
    expect.assertions(7)
    return fetch(BASE_URL)
        .then(res => {
            expect(res.status).toBe(200)
            return res.json()
        })
        .then(resJson => {
            expect(typeof resJson).toBe('object')
            expect(resJson).toHaveLength(2)
            let first_user = resJson[0]
            expect(first_user.id).toBe(1)
            expect(first_user.name).toBe('Group1')
            let second_user = resJson[1]
            expect(second_user.id).toBe(2)
            expect(second_user.name).toBe('Group2')
        })
})

afterAll(() => {
    server.close()
})