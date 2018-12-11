let express = require('express')
let router = express.Router()

var exercises = [
    {
        id: 1,
        author_id: 34,
        text: 'The color of Napoleon\'s white horse'
    },
    {
        id: 2,
        author_id: 12,
        text: 'Which is the highest mountain in the world?'
    },
    {
        id: 3,
        author_id: 43,
        text: 'Italy\'s capital'
    }
]
router.post('/exercises', (req, res) => {
    let exercise = req.body

    if (exercise.id !== undefined) {
        res.status(400).send('Unauthorized to specify exercise ID')
        return
    }

    if (exercise.text === undefined || exercise.text.length === 0) {
        res.status(403).send('An exercise must have a text')
        return
    }

    if (exercise.author_id === undefined) {
        res.status(400).send('An exercise must have an author ID')
        return
    }

    let id = exercises.length + 1
    let newExercise = {
        id: id,
        author_id: exercise.author_id,
        text: exercise.text
    }

    exercises.push(newExercise)
    res.status(200).send({
        status: 'sucessful',
        id: id
    })
})

router.get('/exercises/:id', (req, res) => {
    let id = parseInt(req.params.id)
    let exerciseMatching = exercises.filter(elem => {
        return elem.id === id
    })
    if (exerciseMatching.length === 1) {
        res.status(200).send(exerciseMatching[0])
    } else {
        res.status(404).send('404 - Resource not found')
    }
})

router.get('/exercises', (req, res) => {

    res.status(200).send(exercises)
})

router.delete('/exercises/:id', (req, res) => {
    let id = parseInt(req.params.id)

    if (!Number.isInteger(id)) {
        res.status(400).send('ID is not an integer')
        return
    }

    let exerciseList = exercises.filter(el => {
        return el.id !== id
    })

    if (exerciseList.length === (exercises.length - 1)) {
        exercises = exerciseList
        res.status(200).send()
    } else {
        res.status(404).send('Resource not found')
    }
})

module.exports.router = router  