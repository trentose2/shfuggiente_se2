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
                expect(resBody.answers).toHaveLength(3)
                expect(resBody.id).toBe(2)
                expect(resBody.userId).toBe(2)
                expect(resBody.examId).toBe(54)
                expect(Array.isArray(resBody.answers)).toBe(true)
                expect(resBody.answers < global.submissions[2].answers)
                expect(resBody.answers > global.submissions[2].answers)
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

describe('POST /submissions', () => {
    let validSubmission = {
        userId: 5,
        examId: 23,
        answers: [{ 11: "New answer 1" }, { 45: "New answer 2" }, { 12: "New answer 3" }]
    }

    let invalidSubmissionId = {
        id: 1,
        userId: 5,
        examId: 23,
        answers: [{ 11: "New answer 1" }, { 45: "New answer 2" }, { 12: "New answer 3" }]
    }

    let invalidSubmissionParameter = {
        userId: 5,
        answers: [{ 11: "New answer 1" }, { 45: "New answer 2" }, { 12: "New answer 3" }]
    }

    test('POST valid submission', () => {
        return request(app)
            .post('/api/v1/submissions')
            .send(validSubmission)
            .then((res) => {
                expect(res.statusCode).toBe(200)
                return res.body
            })
            .then(resBody => {
                let id = resBody.id
                expect(id).toBeGreaterThan(0)
                return id
            })
            .then(id => {
                return request(app)
                    .get(`/api/v1/submissions/${id}`)
            })
            .then(res => {
                expect(res.status).toBe(200)
                return res.body
            })
            .then(resBody => {
                expect(typeof resBody).toBe('object')
                expect(resBody.userId).toBe(5)
                expect(resBody.examId).toBe(23)
                expect(Array.isArray(resBody.answers)).toBe(true)
                expect(resBody.answers < validSubmission.answers)
                expect(resBody.answers > validSubmission.answers)
            })
    })

    test('POST invalid submission (with ID)', () => {
        return request(app)
            .post('/api/v1/submissions')
            .send(invalidSubmissionId)
            .then((res) => {
                expect(res.statusCode).toBe(400)
            })
    })

    test('POST invalid submission (without parameters)', () => {
        return request(app)
            .post('/api/v1/submissions')
            .send(invalidSubmissionParameter)
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
