let express = require('express')
let router = express.Router()

let users = [
    {
        id: 1,
        name: 'Admin',
        surname: 'Admin',
        mail: 'admin@admin.com',
        role: 'teacher'
    },
    {
        id: 2,
        name: 'Gianmarco',
        surname: 'Digiacomo',
        mail: 'giandigia@email.com',
        role: 'student'
    }, 
    {
        id: 3,
        name: 'Andrea',
        surname: 'Rosset',
        mail: 'trglaw@gmail.com',
        role: 'student'
    }
]

let submissions = [{
    id: 1,
    userId: 1,
    examId: 54,
    answers: [ {12: "New answer 1" }, {23: "New answer 2" }, {31: "New answer 3" } ]
  },
  {
    id: 2,
    userId: 2,
    examId: 54,
    answers: [ {12: "New answer 1" }, {23: "New answer 2" }, {31: "New answer 3" } ]
  },
  {
    id: 3,
    userId: 1,
    examId: 24,
    answers: [ {52: "New answer 1" }, {67: "New answer 2" }, {87: "New answer 3" } ]
}]

router.get('/users', (req, res) => {
    res.status(200).json(users)
})

router.post('/users', (req, res) => {
    let user = req.body
    if(user.id === undefined) {
        if(user.name !== undefined && user.surname !== undefined && user.mail !== undefined && user.role !== undefined) {
            let id = users.length + 1
            let correctUser = {
                id: id,
                name: user.name,
                surname: user.surname,
                mail: user.mail,
                role: user.role
            }
            users.push(correctUser)
            res.status(200).send({
                id: id
            })
        } else {
            res.status(400).send('Missing parameters in user creation')
        }
    } else {
        res.status(400).send('Forbidden to specify user id during creation')
    }
})

router.get('/users/:id', (req, res) => {
    let id = parseInt(req.params.id)

    if(!Number.isInteger(id)) {
        res.status(400).send()
        return
    }

    let usersMatching = users.filter(elem => {
        return elem.id === id
    })
    if(usersMatching.length === 1) {
        res.status(200).send(usersMatching[0])
    } else {
        res.status(404).send('404 - Resource not found')
    }
})

router.delete('/users/:id', (req, res) => {
    let id = parseInt(req.params.id)

    if(!Number.isInteger(id)) {
        res.status(400).send('ID is not an integer')
        return
    }

    let resultingUsers = users.filter(el => {
        return el.id !== id
    })

    if(resultingUsers.length === (users.length - 1)) {
        users = resultingUsers
        res.status(200).send()
    } else {
        res.status(404).send('Resource not found')
    }
})

router.put('/users/:id', (req, res) => {
    let id = parseInt(req.params.id)
    let user = req.body

    if(!Number.isInteger(id)) {
        res.status(400).send('ID is not an integer')
        return
    }

    console.log(id)

    let usersMatching = users.filter(elem => {
        return elem.id === id
    })

    console.log(usersMatching)

    if(usersMatching.length !== 1) {
        res.status(404).send('Resource not found')
        return
    }

    if(user.id || user.name || user.surname) {
        res.status(403).send('Unauthorized to modify ID or name or surname')
        return
    }

    users.forEach((elem, i) => {
        if(elem.id === id) {
            users[i].mail = user.mail || users[i].mail
            users[i].role = user.role || users[i].role
        }
    })

    res.status(200).send()
})

router.get('/users/:id/submissions', (req, res) => {
    let id = parseInt(req.params.id)

    if(!Number.isInteger(id)) {
        res.status(400).send('ID is not an integer')
        return
    }

    let resultingSubmissions = {submissions: []}
    submissions.forEach(elem => {
        if(elem.userId === id)
            resultingSubmissions.submissions.push(elem.id)
    })

    if(resultingSubmissions.submissions.length > 0) {
        res.status(200).send(resultingSubmissions)
    } else {
        res.status(404).send('No submissions found')
    }

})

module.exports.router = router
