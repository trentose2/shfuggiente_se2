const fetch = require('node-fetch')
const server = require('../index').server
const PORT = require('../index').PORT

let BASE_URL = `http://localhost:${PORT}/api/v1/exams` 

test('Create a valid Exam with exercises and groups', () => {

    const body = {
        author_id: 3,
        name: "Software Engineering II - 15/11/2018",
        exercises: [43,87,62,87,98],
        groups: [13, 15, 17],
        deadline: '2019-07-21T17:32:28.000Z'
    }

    expect.assertions(10)
    return fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify(body)
        })
        .then(res => {
            expect(res.status).toBe(200)
            return res.json()
        })
        .then(response_body => {
            expect(response_body.id).toBeGreaterThan(0)
            return response_body.id
        })
        .then(id => {
            return fetch(BASE_URL + '/' + id)
        })
        .then(res => {
            expect(res.status).toBe(200)
			return res.json()
        })
        .then(response_body => {
            expect(response_body.author_id).toBe(3);
            expect(response_body.name).toBe("Software Engineering II - 15/11/2018")
            expect(response_body.exercises > body.exercises).toBe(false)
            expect(response_body.exercises < body.exercises).toBe(false)
            expect(response_body.groups > body.groups).toBe(false)
            expect(response_body.groups < body.groups).toBe(false)
            expect(response_body.deadline).toBe('2019-07-21T17:32:28.000Z')
        })

})

test('Create a valid Exam with fewer informations', () => {

    const body = {
        author_id: 3,
        name: "Software Engineering II - 15/11/2018",
        exercises: [43,87,62,87,98],
        deadline: '2019-07-21T17:32:28.000Z'
    }

    expect.assertions(9)
    return fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify(body)
        })
        .then(res => {
            expect(res.status).toBe(200)
            return res.json()
        })
        .then(response_body => {
            expect(response_body.id).toBeGreaterThan(0)
            return response_body.id
        })
        .then(id => {
            return fetch(BASE_URL + '/' + id)
        })
        .then(res => {
            expect(res.status).toBe(200)
			return res.json()
        })
        .then(response_body => {
            expect(response_body.author_id).toBe(3)
            expect(response_body.name).toBe("Software Engineering II - 15/11/2018")
            expect(response_body.exercises > body.exercises).toBe(false)
            expect(response_body.exercises < body.exercises).toBe(false)
            expect(response_body.groups.length).toBe(0)
            expect(response_body.deadline).toBe('2019-07-21T17:32:28.000Z')
        })

})

test('Create exam with invalid (negative) author id', () => {

    const body = {
        author_id: -3,
        name: "Software Engineering II - 15/11/2018",
        deadline: '2019-07-21T17:32:28.000Z'
    }

    expect.assertions(1)
    return fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify(body)
    })
    .then(res => {
        expect(res.status).toBe(400) //bad request
        return res.text()
    })
    .then( res => {
        console.log(res)   
    })
})

test('Create exam with invalid (not int) author id', () => {

    const body = {
        author_id: 'id',
        name: "Software Engineering II - 15/11/2018",
        deadline: '2019-07-21T17:32:28.000Z'
    }

    expect.assertions(1)
    return fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify(body)
    })
    .then(res => {
        expect(res.status).toBe(400) //bad request
        return res.text()
    })
    .then( res => {
        console.log(res)   
    })
})

test('Create exam with invalid (object) name', () => {

    const body = {
        author_id: '3',
        name: [1, 2],
        deadline: '2019-07-21T17:32:28.000Z'
    }

    expect.assertions(1)
    return fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify(body)
    })
    .then(res => {
        expect(res.status).toBe(400) //bad request
        return res.text()
    })
    .then( res => {
        console.log(res)   
    })
})

test('Create exam with invalid (not date-time) deadline', () => {

    const body = {
        author_id: '3',
        name: "Software Engineering II - 15/11/2018",
        deadline: '2019-07-21'
    }

    expect.assertions(1)
    return fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify(body)
    })
    .then(res => {
        expect(res.status).toBe(400) //bad request
        return res.text()
    })
    .then(err =>{
        console.log(err)
    })
})

test('Create exam with invalid (not int) execises', () => {

    const body = {
        author_id: '3',
        name: "Software Engineering II - 15/11/2018",
        exercises: ['43', '87', '62', '87', '98'],
        deadline: '2019-07-21T17:32:28.000Z'
    }

    expect.assertions(1)
    return fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify(body)
    })
    .then(res => {
        expect(res.status).toBe(400) //bad request
        return res.text()
    })
    .then( res => {
        console.log(res)   
    })
})

test('Create exam with invalid (not intArray) execises', () => {

    const body = {
        author_id: '3',
        name: "Software Engineering II - 15/11/2018",
        exercises: "[43, 87, 62, 87, 98]",
        deadline: '2019-07-21T17:32:28.000Z'
    }

    expect.assertions(1)
    return fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify(body)
    })
    .then(res => {
        expect(res.status).toBe(400) //bad request
        return res.text()
    })
    .then( res => {
        console.log(res)   
    })
})

test('Create exam with invalid (negative) execises', () => {

    const body = {
        author_id: '3',
        name: "Software Engineering II - 15/11/2018",
        exercises: [43, 87, -62, 87, 98],
        deadline: '2019-07-21T17:32:28.000Z'
    }

    expect.assertions(1)
    return fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify(body)
    })
    .then(res => {
        expect(res.status).toBe(400) //bad request
        return res.text()
    })
    .then( res => {
        console.log(res)   
    })
})

test('Create exam with invalid (not int) groups', () => {

    const body = {
        author_id: '3',
        name: "Software Engineering II - 15/11/2018",
        groups: ['13', '15', '17'],
        deadline: '2019-07-21T17:32:28.000Z'
    }

    expect.assertions(1)
    return fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify(body)
    })
    .then(res => {
        expect(res.status).toBe(400) //bad request
        return res.text()
    })
    .then( res => {
        console.log(res)   
    })
})

test('Create exam with invalid (not intArray) groups', () => {

    const body = {
        author_id: '3',
        name: "Software Engineering II - 15/11/2018",
        groups: "[43, 87, 62, 87, 98]",
        deadline: '2019-07-21T17:32:28.000Z'
    }

    expect.assertions(1)
    return fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify(body)
    })
    .then(res => {
        expect(res.status).toBe(400) //bad request
        return res.text()
    })
    .then( res => {
        console.log(res)   
    })
})

test('Create exam with invalid (negative) groups', () => {

    const body = {
        author_id: '3',
        name: "Software Engineering II - 15/11/2018",
        groups: [13, -15, 17],
        deadline: '2019-07-21T17:32:28.000Z'
    }

    expect.assertions(1)
    return fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify(body)
    })
    .then(res => {
        expect(res.status).toBe(400) //bad request
        return res.text()
    })
    .then( res => {
        console.log(res)   
    })
})

test('Create exam with too few arguments', () => {

    const body = {
        author_id: '3',
        name: "Software Engineering II - 15/11/2018",
    }

    expect.assertions(1)
    return fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify(body)
    })
    .then(res => {
        expect(res.status).toBe(400) //bad request
        return res.text()
    })
    .then( res => {
        console.log(res)   
    })
})

test('Create exam with too many/ wrong arguments', () => {

    const body = {
        id: 3,
        author_id: 3,
        name: "Software Engineering II - 15/11/2018",
        exercises: [43,87,62,87,98],
        groups: [13, 15, 17],
        deadline: '2019-07-21T17:32:28.000Z'
    }

    expect.assertions(1)
    return fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'}, 
                body: JSON.stringify(body)
    })
    .then(res => {
        expect(res.status).toBe(400) //bad request
        return res.text()
    })
    .then( res => {
        console.log(res)   
    })
})



afterAll(() => {
	server.close()
})