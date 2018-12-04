const app = require('../app')
const request = require('supertest')

describe('GET /users', () => {
    test('GET all users', () => {
        return request(app)
            .get('/api/v1/users')
            .then((res) => {
                expect(res.statusCode).toBe(200)
                return res.body
            })
            .then(resBody => {
                expect(typeof resBody).toBe('object')
                expect(resBody).toHaveLength(3)
                let first_user = resBody[0]
                expect(first_user.id).toBe(1)
                expect(first_user.name).toBe('Admin')
            })
    })

    test('GET single valid user', () => {
        return request(app)
            .get('/api/v1/users/2')
            .then((res) => {
                expect(res.statusCode).toBe(200)
                return res.body
            })
            .then(resBody => {
                expect(typeof resBody).toBe('object')
                expect(resBody.id).toBe(2)
                expect(resBody.name).toBe('Gianmarco')
                expect(resBody.surname).toBe('Digiacomo')
                expect(resBody.mail).toBe('giandigia@email.com')
                expect(resBody.role).toBe('student')
            })
    })

    test('GET single not-existent user', () => {
        return request(app)
            .get('/api/v1/users/0')
            .then((res) => {
                expect(res.statusCode).toBe(404)
            })
    })

    test('GET single non-valid id', () => {
        return request(app)
            .get('/api/v1/users/giandigia')
            .then((res) => {
                expect(res.statusCode).toBe(400)
            })
    })
})

describe('POST /users', () => {
    let validUser = {
        name: 'Fabio',
        surname: 'Casagrande',
        mail: 'febo.casa@gmail.com',
        role: 'student'
    }

    let invalidUserId = {
        id: 5,
        name: 'Fabio',
        surname: 'Casagrande',
        mail: 'febo.casa@gmail.com',
        role: 'student'
    }

    let invalidUserParameter = {
        name: 'Fabio',
        surname: 'Casagrande',
        role: 'student'
    }

    let invalidUserParameterObject = {
        name: 'Fabio',
        surname: { 0: 'Casagrande' },
        mail: 'my@mail.com',
        role: 'student'
    }

    let invalidUserParameterArray = {
        name: ['Fabio'],
        surname: 'Casagrande',
        mail: 'my@mail.com',
        role: 'student'
    }

    test('POST valid user', () => {
        return request(app)
            .post('/api/v1/users')
            .send(validUser)
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
                    .get(`/api/v1/users/${id}`)
            })
            .then(res => {
                expect(res.status).toBe(200)
                return res.body
            })
            .then(resBody => {
                expect(typeof resBody).toBe('object')
                expect(resBody.name).toBe('Fabio')
                expect(resBody.surname).toBe('Casagrande')
                expect(resBody.mail).toBe('febo.casa@gmail.com')
                expect(resBody.role).toBe('student')
            })
    })

    test('POST invalid user (with ID)', () => {
        return request(app)
            .post('/api/v1/users')
            .send(invalidUserId)
            .then((res) => {
                expect(res.statusCode).toBe(400)
            })
    })

    test('POST invalid user (without parameters)', () => {
        return request(app)
            .post('/api/v1/users')
            .send(invalidUserParameter)
            .then((res) => {
                expect(res.statusCode).toBe(400)
            })
    })

    test('POST invalid user (passing an object as parameter)', () => {
        return request(app)
            .post('/api/v1/users')
            .send(invalidUserParameterObject)
            .then((res) => {
                expect(res.statusCode).toBe(400)
            })
    })

    test('POST invalid user (passing an array as parameter)', () => {
        return request(app)
            .post('/api/v1/users')
            .send(invalidUserParameterArray)
            .then((res) => {
                expect(res.statusCode).toBe(400)
            })
    })
})

describe('DELETE /users', () => {
    test('DELETE a valid user', () => {
        return request(app)
            .delete('/api/v1/users/1')
            .then(res => {
                expect(res.status).toBe(200)
                return request(app)
                    .get('/api/v1/users')
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
            .delete('/api/v1/users/0')
            .then(res => {
                expect(res.status).toBe(404)
            })
    })

    test('DELETE a non-valid ID', () => {
        return request(app)
            .delete('/api/v1/users/fabio')
            .then(res => {
                expect(res.status).toBe(400)
            })
    })
})

describe('PUT /users', () => {
    let validUser = {
        mail: 'new@mail.com'
    }

    let validUserRole = {
        role: 'teacher'
    }

    let invalidUserId = {
        id: 3,
        mail: 'new@mail.com'
    }

    let invalidUserName = {
        name: 'Gianni',
        role: 'student'
    }

    test('PUT valid user (change mail)', () => {
        return request(app)
            .put('/api/v1/users/2')
            .send(validUser)
            .then(res => {
                expect(res.status).toBe(200)
                return request(app)
                    .get('/api/v1/users/2')
            })
            .then(res => {
                expect(res.status).toBe(200)
                return res.body
            })
            .then(resBody => {
                expect(resBody.mail).toBe('new@mail.com')
            })
    })

    test('PUT valid user (change role)', () => {
        return request(app)
            .put('/api/v1/users/2')
            .send(validUserRole)
            .then(res => {
                expect(res.status).toBe(200)
                return request(app)
                    .get('/api/v1/users/2')
            })
            .then(res => {
                expect(res.status).toBe(200)
                return res.body
            })
            .then(resBody => {
                expect(resBody.role).toBe('teacher')
            })
    })

    test('PUT invalid user (change ID)', () => {
        return request(app)
            .put('/api/v1/users/2')
            .send(invalidUserId)
            .then(res => {
                expect(res.status).toBe(403)
            })
    })

    test('PUT invalid user (change name)', () => {
        return request(app)
            .put('/api/v1/users/2')
            .send(invalidUserName)
            .then(res => {
                expect(res.status).toBe(403)
            })
    })

    test('PUT a non-existent ID', () => {
        return request(app)
            .put('/api/v1/users/0')
            .send(validUser)
            .then(res => {
                expect(res.status).toBe(404)
            })
    })

    test('PUT a non-valid ID', () => {
        return request(app)
            .put('/api/v1/users/nome')
            .send(validUser)
            .then(res => {
                expect(res.status).toBe(400)
            })
    })
})

describe('GET users\' submissions', () => {
    test('GET a valid IDs submissions', () => {
        return request(app)
            .get('/api/v1/users/1/submissions')
            .then(res => {
                expect(res.status).toBe(200)
                return res.body
            })
            .then(resBody => {
                expect(resBody.submissions).toHaveLength(2)
            })
    })

    test('GET a non-existent IDs submissions', () => {
        return request(app)
            .get('/api/v1/users/3/submissions')
            .then(res => {
                expect(res.status).toBe(404)
            })
    })

    test('GET a non-valid IDs submissions', () => {
        return request(app)
            .get('/api/v1/users/io/submissions')
            .then(res => {
                expect(res.status).toBe(400)
            })
    })

    test('GET a non-positive IDs submissions', () => {
        return request(app)
            .get('/api/v1/users/-2/submissions')
            .then(res => {
                expect(res.status).toBe(404)
            })
    })

    test('GET 0 ID submissions', () => {
        return request(app)
            .get('/api/v1/users/0/submissions')
            .then(res => {
                expect(res.status).toBe(404)
            })
    })
})
