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
},
{
    "id": 3,
    "name": "Group 4",
    "members": [
        7,
        5,
        8,
        43,
        878
    ],
    "exams": [
        33,
        84,
        68,
        32
    ]
}];

router.get('/groups', (req, res) => {
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

router.get('/groups/:id', (req, res) => {
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

router.put('/groups/:id', (req, res) => {
    let id = parseInt(req.params.id)
    let group = req.body

    if (!Number.isInteger(id)) {
        res.status(400).send('ID is not an integer')
        return
    }

    console.log(id)

    let groupMatching = groups.filter(elem => {
        return elem.id === id
    })

    if (groupMatching.length !== 1) {
        res.status(404).send('Resource not found')
        return
    }

    if (group.id || group.members || group.exams) {
        res.status(403).send('Unauthorized to modify ID or members or exams')
        return
    }

    if (group.name.length === 0) {
        res.status(400).send('The name can\'t be empty')
        return
    }

    groups.forEach((elem, i) => {
        if (elem.id === id) {
            groups[i].name = group.name
        }
    })

    res.status(200).send()

})

router.post('/groups', (req, res) => {
    let group = req.body

    if (group.id !== undefined) {
        res.status(400).send('Unauthorized to specify group ID')
        return
    }

    if (group.exams !== undefined) {
        res.status(400).send('Unauthorized to add an exam to the group')
        return
    }

    if (group.members === undefined || group.members.length === 0) {
        res.status(403).send('groups must have members')
        return
    }

    let id = groups.length + 1
    let newGroup = {
        id: id,
        name: group.name,
        members: group.members
    }

    groups.push(newGroup)
    res.status(200).send({
        status: 'sucessful',
        id: id
    })
})

module.exports.router = router  