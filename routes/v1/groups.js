let express = require('express')
let router = express.Router()

var groups = [{
    "id": 1,
    "name": "Group 1",
    "members": [
        1,
        98,
        54,
        78,
        100
    ],
    "exams": [
        45,
        12,
        76,
        26
    ]
},
{
    "id": 2,
    "name": "Group 2",
    "members": [
        4,
        65,
        6,
        23,
        678
    ],
    "exams": [
        23,
        54,
        78,
        12
    ]
}];

router.get('/groups', (req, res, next) => {
    let groupsList = []
    groups.forEach(el => {
        groupsList.push(
            {
                "id": el.id,
                "name": el.name
            }
        )
    }
    )
    res.status(200).send(groupsList)
})

router.get('/groups/:id', (req, res, next) => {
    let id = parseInt(req.params.id)
    let groupsMatching = groups.filter(elem => {
        return elem.id === id
    })
    if (groupsMatching.length === 1) {
        res.status(200).send(groupsMatching[0])
    } else {
        res.status(404).send('404 - Resource not found')
    }
})

module.exports.router = router  