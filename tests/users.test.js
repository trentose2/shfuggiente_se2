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

test('GET single user with wrong path paramter', () => {
    expect.assertions(1)
    return fetch(`${BASE_URL}/giandigia`)
        .then(res => {
            expect(res.status).toBe(404)
        })
})

test('POST create a new user with correct data', () => {
    let body = {
        name: 'Fabio',
        surname: 'Casagrande',
        mail: 'febo.casa@gmail.com',
        role: 'student'
    }

    expect.assertions(8)
    return fetch(`${BASE_URL}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
        expect(res.status).toBe(200)
        return res.json()
    })
    .then(resJson => {
        let id = resJson.id
        expect(id).toBeGreaterThan(0)
        return id
    })
    .then(id => {
        return fetch(`${BASE_URL}/${id}`)
    })
    .then(res => {
        expect(res.status).toBe(200)
        return res.json()
    })
    .then(resJson => {
        expect(typeof resJson).toBe('object')
        expect(resJson.name).toBe('Fabio')
        expect(resJson.surname).toBe('Casagrande')
        expect(resJson.mail).toBe('febo.casa@gmail.com')
        expect(resJson.role).toBe('student')
    })
})

test('POST create a new user with ID', () => {
    let body = {
        id: 5,
        name: 'Fabio',
        surname: 'Casagrande',
        mail: 'febo.casa@gmail.com',
        role: 'student'
    }

    expect.assertions(1)
    return fetch(`${BASE_URL}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
        expect(res.status).toBe(400)
    })
})

test('POST create a new user without required parameters', () => {
    let body = {
        name: 'Fabio',
        surname: 'Casagrande',
        role: 'student'
    }

    expect.assertions(1)
    return fetch(`${BASE_URL}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
        expect(res.status).toBe(400)
    })
})

afterAll(() => {
	server.close()
})