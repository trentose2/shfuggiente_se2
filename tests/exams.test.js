const app = require('../app')
const request = require('supertest')

let BASE_URL = `/api/v1/exams`
describe('POST /exams', () => {
    test('Create a valid Exam with exercises and groups', () => {

        const body = {
            author_id: 3,
            name: "Software Engineering II - 15/11/2018",
            exercises: [43, 87, 62, 87, 98],
            groups: [13, 15, 17],
            deadline: '2019-07-21T17:32:28.000Z'
        }

        return request(app)
            .post(BASE_URL)
            .send(body)
            .then(res => {
                expect(res.status).toBe(200)
                return res.body
            })
            .then(response_body => {
                expect(response_body.id).toBeGreaterThan(0)
                return response_body.id
            })
            .then(id => {
                return request(app)
                    .get(BASE_URL + '/' + id)
            })
            .then(res => {
                return res.body
            })
            .then(response_body => {
                expect(response_body.author_id).toBe(body.author_id);
                expect(response_body.name).toBe(body.name)
                //check if exercises is equal to the one provided
                expect(response_body.exercises > body.exercises).toBe(false)
                expect(response_body.exercises < body.exercises).toBe(false)
                //check if groups is equal to the one provided
                expect(response_body.groups > body.groups).toBe(false)
                expect(response_body.groups < body.groups).toBe(false)
                expect(response_body.deadline).toBe(body.deadline)
            })

    })

    test('Create a valid Exam with fewer informations', () => {

        const body = {
            author_id: 3,
            name: "Software Engineering II - 15/11/2018",
            exercises: [43, 87, 62, 87, 98],
            deadline: '2019-07-21T17:32:28.000Z'
        }
        return request(app)
            .post(BASE_URL)
            .send(body)
            .then(res => {
                expect(res.status).toBe(200)
                return res.body
            })
            .then(response_body => {
                expect(response_body.id).toBeGreaterThan(0)
                return response_body.id
            })
            .then(id => {
                return request(app)
                    .get(BASE_URL + '/' + id)
            })
            .then(res => {
                expect(res.status).toBe(200)
                return res.body
            })
            .then(response_body => {
                expect(response_body.author_id).toBe(body.author_id);
                expect(response_body.name).toBe(body.name)
                //check if exercises is equal to the one provided
                expect(response_body.exercises > body.exercises).toBe(false)
                expect(response_body.exercises < body.exercises).toBe(false)
                //check if groups is empty as expected
                expect(response_body.groups.length).toBe(0)
                expect(response_body.deadline).toBe(body.deadline)
            })

    })

    test('Create exam with invalid (negative) author id', () => {

        const body = {
            author_id: -3,
            name: "Software Engineering II - 15/11/2018",
            deadline: '2019-07-21T17:32:28.000Z'
        }

        return request(app)
            .post(BASE_URL)
            .send(body)
            .then(res => {
                expect(res.status).toBe(400) //bad request
            })
    })

    test('Create exam with invalid (not int) author id', () => {

        const body = {
            author_id: 'id',
            name: "Software Engineering II - 15/11/2018",
            deadline: '2019-07-21T17:32:28.000Z'
        }

        return request(app)
            .post(BASE_URL)
            .send(body)
            .then(res => {
                expect(res.status).toBe(400) //bad request
            })
    })

    test('Create exam with invalid (object) name', () => {

        const body = {
            author_id: '3',
            name: [1, 2],
            deadline: '2019-07-21T17:32:28.000Z'
        }

        return request(app)
            .post(BASE_URL)
            .send(body)
            .then(res => {
                expect(res.status).toBe(400) //bad request
            })
    })

    test('Create exam with no name', () => {

        const body = {
            author_id: '3',
            exercises: [43, 87, 62, 87, 98],
            deadline: '2019-07-21T17:32:28.000Z'
        }

        return request(app)
            .post(BASE_URL)
            .send(body)
            .then(res => {
                expect(res.status).toBe(400) //bad request
            })
    })

    test('Create exam with invalid (not date-time) deadline', () => {

        const body = {
            author_id: '3',
            name: "Software Engineering II - 15/11/2018",
            deadline: '2019-07-21'
        }

        return request(app)
            .post(BASE_URL)
            .send(body)
            .then(res => {
                expect(res.status).toBe(400) //bad request
            })
    })
    test('Create exam with no deadline', () => {

        const body = {
            author_id: '3',
            exercises: [43, 87, 62, 87, 98],
            name: "Software Engineering II - 15/11/2018",
        }

        return request(app)
            .post(BASE_URL)
            .send(body)
            .then(res => {
                expect(res.status).toBe(400) //bad request
            })
    })

    test('Create exam with invalid (not int) execises', () => {

        const body = {
            author_id: '3',
            name: "Software Engineering II - 15/11/2018",
            exercises: ['43', '87', '62', '87', '98'],
            deadline: '2019-07-21T17:32:28.000Z'
        }

        return request(app)
            .post(BASE_URL)
            .send(body)
            .then(res => {
                expect(res.status).toBe(400) //bad request
            })
    })

    test('Create exam with invalid (not intArray) execises', () => {

        const body = {
            author_id: '3',
            name: "Software Engineering II - 15/11/2018",
            exercises: "[43, 87, 62, 87, 98]",
            deadline: '2019-07-21T17:32:28.000Z'
        }

        return request(app)
            .post(BASE_URL)
            .send(body)
            .then(res => {
                expect(res.status).toBe(400) //bad request
            })
    })

    test('Create exam with invalid (negative) execises', () => {

        const body = {
            author_id: '3',
            name: "Software Engineering II - 15/11/2018",
            exercises: [43, 87, -62, 87, 98],
            deadline: '2019-07-21T17:32:28.000Z'
        }

        return request(app)
            .post(BASE_URL)
            .send(body)
            .then(res => {
                expect(res.status).toBe(400) //bad request
            })
    })

    test('Create exam with invalid (not int) groups', () => {

        const body = {
            author_id: '3',
            name: "Software Engineering II - 15/11/2018",
            groups: ['13', '15', '17'],
            deadline: '2019-07-21T17:32:28.000Z'
        }

        return request(app)
            .post(BASE_URL)
            .send(body)
            .then(res => {
                expect(res.status).toBe(400) //bad request
            })
    })

    test('Create exam with invalid (not intArray) groups', () => {

        const body = {
            author_id: '3',
            name: "Software Engineering II - 15/11/2018",
            groups: "[43, 87, 62, 87, 98]",
            deadline: '2019-07-21T17:32:28.000Z'
        }

        return request(app)
            .post(BASE_URL)
            .send(body)
            .then(res => {
                expect(res.status).toBe(400) //bad request
            })
    })

    test('Create exam with invalid (negative) groups', () => {

        const body = {
            author_id: '3',
            name: "Software Engineering II - 15/11/2018",
            groups: [13, -15, 17],
            deadline: '2019-07-21T17:32:28.000Z'
        }

        return request(app)
            .post(BASE_URL)
            .send(body)
            .then(res => {
                expect(res.status).toBe(400) //bad request
            })
    })

    test('Create exam with too few arguments', () => {

        const body = {
            author_id: '3',
            name: "Software Engineering II - 15/11/2018",
        }

        return request(app)
            .post(BASE_URL)
            .send(body)
            .then(res => {
                expect(res.status).toBe(400) //bad request
            })
    })

    test('Create exam with too many arguments', () => {

        const body = {
            id: 3,
            author_id: 3,
            name: "Software Engineering II - 15/11/2018",
            exercises: [43, 87, 62, 87, 98],
            groups: [13, 15, 17],
            deadline: '2019-07-21T17:32:28.000Z'
        }

        return request(app)
            .post(BASE_URL)
            .send(body)
            .then(res => {
                expect(res.status).toBe(400) //bad request
            })
    })

    test('Create exam with right number of params but wrong arguments', () => {

        const body = {
            id: 3,
            author_id: 3,
            name: "Software Engineering II - 15/11/2018",
            groups: [13, 15, 17],
            deadline: '2019-07-21T17:32:28.000Z'
        }

        return request(app)
            .post(BASE_URL)
            .send(body)
            .then(res => {
                expect(res.status).toBe(400) //bad request
            })
    })
})

describe('GET /exams/:id', () => {
    test('try to reach an existing exam', () => {

        const body = { //this entity already exists in the ""db""
            id: 2,
            author_id: 3,
            name: "Software Engineering II - 15/11/2018",
            exercises: [43, 87, 62, 87, 98],
            groups: [13, 15, 17],
            deadline: '2019-07-21T17:32:28.000Z'
        }

        return request(app)
            .get(BASE_URL + "/" + body.id)
            .then(res => {
                expect(res.status).toBe(200)
                return res.body
            })
            .then(response_body => {
                expect(response_body.author_id).toBe(body.author_id);
                expect(response_body.name).toBe(body.name)
                expect(response_body.exercises > body.exercises).toBe(false)
                expect(response_body.exercises < body.exercises).toBe(false)
                expect(response_body.groups > body.groups).toBe(false)
                expect(response_body.groups < body.groups).toBe(false)
                expect(response_body.deadline).toBe(body.deadline)
            })
    })

    test('Try to reach a non existing exam', () => {

        return request(app)
            .get(BASE_URL + '/18')
            .then(res => {
                expect(res.status).toBe(404)
            })
    })

    test('Try to reach an exam with negative id', () => {

        return request(app)
            .get(BASE_URL + '/-3')
            .then(res => {
                expect(res.status).toBe(400)
            })
    })

    test('Try to reach an exam with non int id', () => {

        return request(app)
            .get(BASE_URL + '/notanint')
            .then(res => {
                expect(res.status).toBe(400)
            })
    })
})

describe('PUT /exams/:id', () => {
    test('Try to modify an exam name correctly', () => {

        const body = {
            author_id: 3,
            name: "Software Engineering II - 15/11/2018",
            exercises: [43, 87, 62, 87, 98],
            groups: [13, 15, 17],
            deadline: '2019-07-21T17:32:28.000Z'
        }

        const body_mod = {
            name: "Not the name before",
            exercises: [43, 87, 62, 87, 98],
            groups: [13, 15, 17],
            deadline: '2019-07-21T17:32:28.000Z'
        }

        let given_id = 0

        return request(app)
            .post(BASE_URL)
            .send(body)
            .then(res => {
                expect(res.status).toBe(200)
                return res.body.id
            })
            .then(id => {
                given_id = id
                return request(app)
                    .put(BASE_URL + `/${given_id}`)
                    .send(body_mod)
            })
            .then(res => {
                expect(res.status).toBe(200)
                return request(app)
                    .get(BASE_URL + `/${given_id}`)
            })
            .then(res => {
                expect(res.status).toBe(200)
                return res.body
            })
            .then(response_body => {
                expect(response_body.name).toBe(body.name)
                //check if exercises is equal to the one provided
                expect(response_body.exercises > body.exercises).toBe(false)
                expect(response_body.exercises < body.exercises).toBe(false)
                //check if groups is equal to the one provided
                expect(response_body.groups > body.groups).toBe(false)
                expect(response_body.groups < body.groups).toBe(false)
                expect(response_body.deadline).toBe(body.deadline)
            })

    })

    test('Try to modify exam name with an object', () => {

        const body = {
            name: [12, 13],
            exercises: [43, 87, 62, 87, 98],
            groups: [13, 15, 17],
            deadline: '2019-07-21T17:32:28.000Z'
        }
        return request(app)
            .put(BASE_URL + `/2`)
            .send(body)
            .then(res => {
                expect(res.status).toBe(400)
            })

    })

    test('Try to modify exam with no name', () => {

        const body = {
            exercises: [43, 87, 62, 87, 98],
            groups: [13, 15, 17],
            deadline: '2019-07-21T17:32:28.000Z'
        }
        return request(app)
            .put(BASE_URL + "/2")
            .send(body)
            .then(res => {
                expect(res.status).toBe(400)
            })

    })

    test('Try to modify exercises related to the exam correctly', () => {

        const body = {
            author_id: 3,
            name: "Software Engineering II - 15/11/2018",
            exercises: [43, 87, 62, 87, 98],
            groups: [13, 15, 17],
            deadline: '2019-07-21T17:32:28.000Z'
        }

        const body_mod = {
            name: "Software Engineering II - 15/11/2018",
            exercises: [43, 87, 62, 87, 998],
            groups: [13, 15, 17],
            deadline: '2019-07-21T17:32:28.000Z'
        }

        let given_id = 0

        return request(app)
            .post(BASE_URL)
            .send(body)
            .then(res => {
                expect(res.status).toBe(200)
                return res.body.id
            })
            .then(id => {
                given_id = id
                return request(app)
                    .put(BASE_URL + `/${given_id}`)
                    .send(body_mod)
            })
            .then(res => {
                expect(res.status).toBe(200)
                return request(app)
                    .get(BASE_URL + `/${given_id}`)
            })
            .then(res => {
                expect(res.status).toBe(200)
                return res.body
            })
            .then(response_body => {
                expect(response_body.name).toBe(body.name)
                //check if exercises is equal to the one provided
                expect(response_body.exercises > body.exercises).toBe(false)
                expect(response_body.exercises < body.exercises).toBe(false)
                //check if groups is equal to the one provided
                expect(response_body.groups > body.groups).toBe(false)
                expect(response_body.groups < body.groups).toBe(false)
                expect(response_body.deadline).toBe(body.deadline)
            })

    })

    test('Try to modify exam exercises with a non array', () => {

        const body = {
            name: "Software Engineering II - 15/11/2018",
            exercises: 'definitelynotanarray',
            groups: [13, 15, 17],
            deadline: '2019-07-21T17:32:28.000Z'
        }
        return request(app)
            .put(BASE_URL + "/2")
            .send(body)
            .then(res => {
                expect(res.status).toBe(400)
            })

    })

    test('Try to modify exam exercises with a non int array', () => {

        const body = {
            name: "Software Engineering II - 15/11/2018",
            exercises: ['43', '87', '62', '87', '998'],
            groups: [13, 15, 17],
            deadline: '2019-07-21T17:32:28.000Z'
        }
        return request(app)
            .put(BASE_URL + "/2")
            .send(body)
            .then(res => {
                expect(res.status).toBe(400)
            })

    })

    test('Try to modify exam exercises with a non positive ints array', () => {

        const body = {
            name: "Software Engineering II - 15/11/2018",
            exercises: [-43, 87, 62, 87, 998],
            groups: [13, 15, 17],
            deadline: '2019-07-21T17:32:28.000Z'
        }
        return request(app)
            .put(BASE_URL + "/2")
            .send(body)
            .then(res => {
                expect(res.status).toBe(400)
            })

    })

    test('Try to modify exam with no exercises', () => {

        const body = {
            name: "Software Engineering II - 15/11/2018",
            groups: [13, 15, 17],
            deadline: '2019-07-21T17:32:28.000Z'
        }
        return request(app)
            .put(BASE_URL + "/2")
            .send(body)
            .then(res => {
                expect(res.status).toBe(400)
            })

    })

    test('Try to modify groups related to the exam correctly', () => {

        const body = {
            author_id: 3,
            name: "Software Engineering II - 15/11/2018",
            exercises: [43, 87, 62, 87, 98],
            groups: [13, 15, 17],
            deadline: '2019-07-21T17:32:28.000Z'
        }

        const body_mod = {
            name: "Software Engineering II - 15/11/2018",
            exercises: [43, 87, 62, 87, 98],
            groups: [13, 15, 177],
            deadline: '2019-07-21T17:32:28.000Z'
        }

        let given_id = 0

        return request(app)
            .post(BASE_URL)
            .send(body)
            .then(res => {
                expect(res.status).toBe(200)
                return res.body.id
            })
            .then(id => {
                given_id = id
                return request(app)
                    .put(BASE_URL + `/${given_id}`)
                    .send(body_mod)
            })
            .then(res => {
                expect(res.status).toBe(200)
                return request(app)
                    .get(BASE_URL + `/${given_id}`)
            })
            .then(res => {
                expect(res.status).toBe(200)
                return res.body
            })
            .then(response_body => {
                expect(response_body.name).toBe(body.name)
                //check if exercises is equal to the one provided
                expect(response_body.exercises > body.exercises).toBe(false)
                expect(response_body.exercises < body.exercises).toBe(false)
                //check if groups is equal to the one provided
                expect(response_body.groups > body.groups).toBe(false)
                expect(response_body.groups < body.groups).toBe(false)
                expect(response_body.deadline).toBe(body.deadline)
            })

    })

    test('Try to modify exam groups with a non array', () => {

        const body = {
            name: "Software Engineering II - 15/11/2018",
            exercises: [43, 87, 62, 87, 98],
            groups: '[13, 15, 17]',
            deadline: '2019-07-21T17:32:28.000Z'
        }
        return request(app)
            .put(BASE_URL + "/2")
            .send(body)
            .then(res => {
                expect(res.status).toBe(400)
            })

    })

    test('Try to modify exam groups with a non int array', () => {

        const body = {
            name: "Software Engineering II - 15/11/2018",
            exercises: [43, 87, 62, 87, 98],
            groups: ['13', '15', '17'],
            deadline: '2019-07-21T17:32:28.000Z'
        }
        return request(app)
            .put(BASE_URL + "/2")
            .send(body)
            .then(res => {
                expect(res.status).toBe(400)
            })

    })

    test('Try to modify exam groups with a non positive ints array', () => {

        const body = {
            name: "Software Engineering II - 15/11/2018",
            exercises: [43, 87, 62, 87, 98],
            groups: [-13, 15, 17],
            deadline: '2019-07-21T17:32:28.000Z'
        }
        return request(app)
            .put(BASE_URL + "/2")
            .send(body)
            .then(res => {
                expect(res.status).toBe(400)
            })

    })

    test('Try to modify exam with no groups', () => {

        const body = {
            name: "Software Engineering II - 15/11/2018",
            exercises: [43, 87, 62, 87, 98],
            deadline: '2019-07-21T17:32:28.000Z'
        }
        return request(app)
            .put(BASE_URL + "/2")
            .send(body)
            .then(res => {
                expect(res.status).toBe(400)
            })

    })

    test('Try to modify exam deadline correctly', () => {

        const body = {
            author_id: 3,
            name: "Software Engineering II - 15/11/2018",
            exercises: [43, 87, 62, 87, 98],
            groups: [13, 15, 17],
            deadline: '2019-07-21T17:32:28.000Z'
        }

        const body_mod = {
            name: "Software Engineering II - 15/11/2018",
            exercises: [43, 87, 62, 87, 98],
            groups: [13, 15, 17],
            deadline: '2029-07-21T17:32:28.000Z'
        }

        let given_id = 0

        return request(app)
            .post(BASE_URL)
            .send(body)
            .then(res => {
                expect(res.status).toBe(200)
                return res.body.id
            })
            .then(id => {
                given_id = id
                return request(app)
                    .put(BASE_URL + `/${given_id}`)
                    .send(body_mod)
            })
            .then(res => {
                expect(res.status).toBe(200)
                return request(app)
                    .get(BASE_URL + `/${given_id}`)
            })
            .then(res => {
                expect(res.status).toBe(200)
                return res.body
            })
            .then(response_body => {
                expect(response_body.name).toBe(body.name)
                //check if exercises is equal to the one provided
                expect(response_body.exercises > body.exercises).toBe(false)
                expect(response_body.exercises < body.exercises).toBe(false)
                //check if groups is equal to the one provided
                expect(response_body.groups > body.groups).toBe(false)
                expect(response_body.groups < body.groups).toBe(false)
                expect(response_body.deadline).toBe(body.deadline)
            })

    })

    test('Try to modify exam deadline with a non valid value', () => {

        const body = {
            name: "Software Engineering II - 15/11/2018",
            exercises: [43, 87, 62, 87, 98],
            groups: [13, 15, 17],
            deadline: '2019-07-217:32:28.000Z'
        }
        return request(app)
            .put(BASE_URL + "/2")
            .send(body)
            .then(res => {
                expect(res.text).toBe("400 - Bad date format")
                expect(res.status).toBe(400)
            })

    })

    test('Try to modify exam with no deadline', () => {

        const body = {
            name: "Software Engineering II - 15/11/2018",
            exercises: [43, 87, 62, 87, 98],
            groups: [13, 15, 17],
        }
        return request(app)
            .put(BASE_URL + "/2")
            .send(body)
            .then(res => {
                expect(res.status).toBe(400)
            })

    })

    test('Try to modify an exam with non int id', () => {

        const body = {
            name: "A valid name",
            exercises: [43, 87, 62, 87, 98],
            groups: [13, 15, 17],
            deadline: '2019-07-21T17:32:28.000Z'
        }
        return request(app)
            .put(BASE_URL + "/notanint")
            .send(body)
            .then(res => {
                expect(res.status).toBe(400)
            })
    })

    test('Try to modify an exam with negative id', () => {

        const body = {
            name: "A valid name",
            exercises: [43, 87, 62, 87, 98],
            groups: [13, 15, 17],
            deadline: '2019-07-21T17:32:28.000Z'
        }
        return request(app)
            .put(BASE_URL + "/-2")
            .send(body)
            .then(res => {
                expect(res.status).toBe(400)
            })
    })

    test('Try to modify an exam with too many arguments', () => {

        const body = {
            extra: "this si not allowed",
            name: "A valid name",
            exercises: [43, 87, 62, 87, 98],
            groups: [13, 15, 17],
            deadline: '2019-07-21T17:32:28.000Z'
        }
        return request(app)
            .put(BASE_URL + "/2")
            .send(body)
            .then(res => {
                expect(res.status).toBe(400)
            })
    })

    test('Try to modify an exam with too wrong arguments', () => {

        const body = {
            exam_name: "This should be just name",
            exercises: [43, 87, 62, 87, 98],
            groups: [13, 15, 17],
            deadline: '2019-07-21T17:32:28.000Z'
        }
        return request(app)
            .put(BASE_URL + "/2")
            .send(body)
            .then(res => {
                expect(res.status).toBe(400)
            })
    })

    test('Try to modify a non existing exam', () => {

        const body = {
            name: "A valid name",
            exercises: [43, 87, 62, 87, 98],
            groups: [13, 15, 17],
            deadline: '2019-07-21T17:32:28.000Z'
        }
        return request(app)
            .put(BASE_URL + "/5")
            .send(body)
            .then(res => {
                expect(res.status).toBe(404)
            })

    })
})