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

router.get('/users', (req, res, next) => {
    res.status(200).json(users)
})

router.get('/users/:id', (req, res, next) => {
    let id = parseInt(req.params.id)
    let usersMatching = users.filter(elem => {
        return elem.id === id
    })
    if(usersMatching.length === 1) {
        res.status(200).send(usersMatching[0])
    } else {
        res.status(404).send('404 - Resource not found')
    }
})

module.exports = router