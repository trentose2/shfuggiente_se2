const fetch = require('node-fetch')
const server = require('../index').server
const PORT = require('../index').PORT

let BASE_URL = `http://localhost:${PORT}/api/v1/groups`

test('GET all groups', () => {
    expect.assertions(8)
    return fetch(BASE_URL)
        .then(res => {
            expect(res.status).toBe(200)
            return res.json()
        })
        .then(resJson => {
            expect(typeof resJson).toBe('object')
            let first_group = resJson[0]
            expect(Object.keys(first_group).length).toBe(2)
            expect(first_group.id).toBe(1)
            expect(first_group.name).toBe('Group 1')
            let second_group = resJson[1]
            expect(second_group).toHaveLength(2)
            expect(second_group.id).toBe(2)
            expect(second_group.name).toBe('Group 2')
        })
})


test('GET single group with valid ID', () => {
    expect.assertions(9)
    return fetch(`${BASE_URL}/1`)
        .then(res => {
            expect(res.status).toBe(200)
            return res.json()
        })
        .then(resJson => {
            expect(typeof resJson).toBe('object')
            expect(typeof resJson.id).toBe('integer')
            expect(resJson.id).toBe(1)
            expect(typeof resJson.name).toBe('string')
            expect(resJson.name).toBe('Group 1')
            expect(typeof resJson.members).toBe('array')
            expect(resJson.members).toEqual(expect.arrayContaining([1,
                98,
                54,
                78,
                100]))
            expect(resJson.exams).toEqual(expect.arrayContaining([45,
                12,
                76,
                26]))
        })
})

test('GET single group with non-existent ID', () => {
    expect.assertions(1)
    return fetch(`${BASE_URL}/0`)
        .then(res => {
            expect(res.status).toBe(404)
        })
})

afterAll(() => {
    server.close()
})