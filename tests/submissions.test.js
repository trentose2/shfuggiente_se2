const app = require('../app')
const request = require('supertest')

describe('GET /submissions', () => {
    test('GET all submissions', () => {
        return request(app)
            .get('/api/v1/submissions')
            .then((res) => {
                expect(res.statusCode).toBe(200)
                return res.body
            })
            .then(resBody => {
            })
    })

    test('GET single valid submission', () => {
        return request(app)
            .get('/api/v1/submissions/2')
            .then((res) => {
                expect(res.statusCode).toBe(200)
                return res.body
            })
            .then(resBody => {
              expect(typeof resBody).toBe('object')
              expect(resBody).toHaveLength(3)
              expect(resJson.id).toBe(2)
              expect(resJson.userId).toBe(1)
              expect(resJson.examId).toBe(24)
              expect(Array.isArray(resJson.answers)).toBe(true)
              expect(resJson.answers < submissionsFactory[2].answers)
              expect(resJson.answers > submissionsFactory[2].answers)
            })
    })

    test('GET single not-existent submission', () => {
        return request(app)
            .get('/api/v1/submissions/0')
            .then((res) => {
                expect(res.statusCode).toBe(404)
            })
    })

    test('GET single non-valid id', () => {
        return request(app)
            .get('/api/v1/submissions/giandigia')
            .then((res) => {
                expect(res.statusCode).toBe(400)
            })
    })
})

describe('DELETE /submissions', () => {
    test('DELETE a valid submission', () => {
        return request(app)
            .delete('/api/v1/submissions/1')
            .then(res => {
                expect(res.status).toBe(200)
                return request(app)
                    .get('/api/v1/submissions')
            })
            .then(res => {
                expect(res.status).toBe(200)
                return res.body
            })
            .then(resBody => {
                expect(resBody).toHaveLength(3)
                expect(resBody[0].id).toBe(2)
            })
    })

    test('DELETE a non-existent ID', () => {
        return request(app)
            .delete('/api/v1/submissions/0')
            .then(res => {
                expect(res.status).toBe(404)
            })
    })

    test('DELETE a non-valid ID', () => {
        return request(app)
            .delete('/api/v1/submissions/fabio')
            .then(res => {
                expect(res.status).toBe(400)
            })
    })
})
