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

describe('PUT /groups', () => {

    let validGroup = {
        name: 'Group 3'
    }

    let invalidData = {
        members: [
            1,
            23,
            45,
            56
        ]
    }

    let emptyData = {
        name: ''
    }


    test('PUT valid group', () => {
        return request(app)
            .put('/api/v1/groups/3')
            .send(validGroup)
            .then(res => {
                expect(res.status).toBe(200)
                return request(app)
                    .get('/api/v1/groups/3')
            })
            .then(res => {
                expect(res.status).toBe(200)
                return res.body
            })
            .then(resJson => {
                expect(resJson.id).toBe(3)
                expect(resJson.name).toBe('Group 3')
            })
    })

    test('PUT non-existent group', () => {
        return request(app)
            .put('/api/v1/groups/5')
            .send(validGroup)
            .then(res => {
                expect(res.status).toBe(404)
            })
    })

    test('PUT non-valid ID', () => {
        return request(app)
            .put('/api/v1/groups/members')
            .send(validGroup)
            .then(res => {
                expect(res.status).toBe(400)
            })
    })

    test('PUT invalid data', () => {
        return request(app)
            .put('/api/v1/groups/3')
            .send(invalidData)
            .then((res) => {
                expect(res.status).toBe(403)
            })
    })

    test('PUT empty data', () => {
        return request(app)
            .put('/api/v1/groups/3')
            .send(emptyData)
            .then((res) => {
                expect(res.status).toBe(400)
            })
    })
})

describe('POST /groups', () => {

    let validGroup = {
        name: 'Group 4',
        members: [
            1,
            23,
            45,
            56
        ]
    }

    let invalidData1 = {
        name: 'Group 5',
        exams: [
            5,
            73,
            85,
            96
        ]
    }

    let invalidData2 = {
        id: 23,
        name: 'Group 5',
        members: [
            1,
            23,
            45,
            56
        ]
    }

    let invalidData3 = {
        name: 'Group 5'
    }

    let emptyData = {
        name: 'Group 6',
        members: []
    }


    test('POST valid group', () => {
        return request(app)
            .post('/api/v1/groups')
            .send(validGroup)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                return res.body
            })
            .then(resJson => {
                let id = resJson.id
                expect(id).toBeGreaterThan(0)
                return id
            })
            .then(id => {
                return request(app)
                    .get(`/api/v1/groups/${id}`)
            })
            .then(res => {
                expect(res.status).toBe(200)
                return res.body
            })
            .then(resJson => {
                expect(typeof resJson).toBe('object')
                expect(typeof resJson.name).toBe('string')
                expect(resJson.name).toBe('Group 4')
                expect(typeof resJson.members).toBe('object')
                expect(resJson.members).toEqual(expect.arrayContaining([
                    1,
                    23,
                    45,
                    56]))
            })
    })

    test('POST invalid data1', () => {
        return request(app)
            .post('/api/v1/groups')
            .send(invalidData1)
            .then((res) => {
                expect(res.status).toBe(400)
            })
    })

    test('POST invalid data2', () => {
        return request(app)
            .post('/api/v1/groups')
            .send(invalidData2)
            .then((res) => {
                expect(res.status).toBe(400)
            })
    })

    test('POST invalid data3', () => {
        return request(app)
            .post('/api/v1/groups')
            .send(invalidData3)
            .then((res) => {
                expect(res.status).toBe(403)
            })
    })

    test('PUT empty data', () => {
        return request(app)
            .post('/api/v1/groups')
            .send(emptyData)
            .then((res) => {
                expect(res.status).toBe(403)
            })
    })
})