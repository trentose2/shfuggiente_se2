const app = require('../app')
const request = require('supertest')

describe('POST /exercises', () => {

    let validExercise = {
        author_id: 23,
        text: 'Which is the mass of the Sun?'
    }

    let invalidData1 = {
        id: 2,
        author_id: 45,
        text: 'Invalid question?'
    }

    let invalidData2 = {
        author_id: 2
    }

    let invalidData3 = {
        text: 'Questions?'
    }

    let emptyData = {
        author_id: 3,
        text: ''
    }



    test('POST valid exercise', () => {
        return request(app)
            .post('/api/v1/exercises')
            .send(validExercise)
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
                console.log(id)
                return request(app)
                    .get(`/api/v1/exercises/${id}`)
            })
            .then(res => {
                expect(res.status).toBe(200)
                return res.body
            })
            .then(resJson => {
                expect(typeof resJson).toBe('object')
                expect(typeof resJson.author_id).toBe('number')
                expect(resJson.author_id).toBe(23)
                expect(typeof resJson.text).toBe('string')
                expect(resJson.text).toBe('Which is the mass of the Sun?')
            })
    })

    test('POST invalid data1', () => {
        return request(app)
            .post('/api/v1/exercises')
            .send(invalidData1)
            .then((res) => {
                expect(res.status).toBe(400)
            })
    })

    test('POST invalid data2', () => {
        return request(app)
            .post('/api/v1/exercises')
            .send(invalidData2)
            .then((res) => {
                expect(res.status).toBe(403)
            })
    })

    test('POST invalid data3', () => {
        return request(app)
            .post('/api/v1/exercises')
            .send(invalidData3)
            .then((res) => {
                expect(res.status).toBe(403)
            })
    })

    test('POST empty data', () => {
        return request(app)
            .post('/api/v1/exercises')
            .send(emptyData)
            .then((res) => {
                expect(res.status).toBe(403)
            })
    })
})

describe('DELETE /exercises', () => {
    test('DELETE a valid exercise', () => {
        return request(app)
            .delete('/api/v1/exercises/2')
            .then(res => {
                expect(res.status).toBe(200)
                return request(app)
                    .get('/api/v1/exercises')
            })
            .then(res => {
                expect(res.status).toBe(200)
                return res.body
            })
            .then(resJson => {
                expect(resJson).toHaveLength(3)
                expect(resJson[1].id).toBe(3)
            })
    })

    test('DELETE non-existent ID', () => {
        return request(app)
            .delete('/api/v1/exercises/8')
            .then(res => {
                expect(res.status).toBe(404)
            })
    })

    test('DELETE non-valid ID', () => {
        return request(app)
            .delete('/api/v1/exercises/name')
            .then(res => {
                expect(res.status).toBe(400)
            })
    })
})