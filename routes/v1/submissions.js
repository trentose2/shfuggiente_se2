let express = require('express')
let router = express.Router()

global.submissions = [
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

router.get('/submissions', (req, res) => {
        res.status(200).send(submissions)    
})

router.get('/submissions/:id', (req, res) => {
    let id = parseInt(req.params.id)

    if(!Number.isInteger(id)) {
        res.status(400).send()
        return
    }

    let submissionsMatching = submissions.filter(elem => {
        return elem.id === id
    })
    if(submissionsMatching.length === 1) {
        res.status(200).send(submissionsMatching[0])
    } else {
        res.status(404).send('404 - Resource not found')
    }
})

router.post('/submissions', (req, res) => {
    let submission = req.body
    if(submission.id === undefined) {
        if(submission.userId !== undefined && submission.examId !== undefined && submission.answers !== undefined) {
            let id = submissions.length + 1
            let correctSubmission = {
                id: id,
                userId: submission.userId,
                examId: submission.examId,
                answers: submission.answers
            }
            submissions.push(correctSubmission)
            res.status(200).send({
                id: id,
                userId: submission.userId,
                examId: submission.examId,
                answers: submission.answers
            })
        } else {
            res.status(400).send('Missing parameters in submission creation')
        }
    } else {
        res.status(400).send('Forbidden to specify submission id during creation')
    }
})

router.delete('/submissions/:id', (req,res) => {
  let id = parseInt(req.params.id)

  if(!Number.isInteger(id)) {
    res.status(400).send()
    return
}

  let submissionsMatching = submissions.filter(elem => {
      return elem.id === id
  })
  if(submissionsMatching.length === 1) {
    submissions = submissions.filter(elem => {
      return elem.id != id
    })
      res.status(200).send({status: "successful"})
  } else {
      res.status(404).send('404 - Resource not found')
  }
});


module.exports.router = router
