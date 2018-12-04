let express = require('express')
let router = express.Router()

global.submissionsFactory = [
  {
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
  }
]

router.get('/submissions/:id', (req, res) => {
    let id = parseInt(req.params.id)
    let submissionsMatching = submissionsFactory.filter(elem => {
        return elem.id === id
    })
    if(submissionsMatching.length === 1) {
        res.status(200).send(submissionsMatching[0])
    } else {
        res.status(404).send('404 - Resource not found')
    }
})


module.exports = router
