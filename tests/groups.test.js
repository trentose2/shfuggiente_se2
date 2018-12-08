const app = require('../app')
const request = require('supertest')

describe('GET /groups', () => {
    test('GET all groups', () => {
        return request(app)
            .get('/api/v1/groups')
            .then((res) => {
                expect(res.status).toBe(200)
                return res.body
            })
            .then(resJson => {
                expect(typeof resJson).toBe('object')
                let first_group = resJson[0]
                expect(Object.keys(first_group).length).toBe(2)
                expect(first_group.id).toBe(1)
                expect(first_group.name).toBe('Group 1')
                let second_group = resJson[1]
                expect(Object.keys(second_group).length).toBe(2)
                expect(second_group.id).toBe(2)
                expect(second_group.name).toBe('Group 2')
            })
    })


    test('GET single group with valid ID', () => {
        return request(app)
            .get('/api/v1/groups/1')
            .then((res) => {
                expect(res.status).toBe(200)
                return res.body
            })
            .then(resJson => {
                expect(typeof resJson).toBe('object')
                expect(typeof resJson.id).toBe('number')
                expect(resJson.id).toBe(1)
                expect(typeof resJson.name).toBe('string')
                expect(resJson.name).toBe('Group 1')
                expect(typeof resJson.members).toBe('object')
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
        return request(app)
            .get('/api/v1/groups/56')
            .then((res) => {
                expect(res.status).toBe(404)
            })
    })

})