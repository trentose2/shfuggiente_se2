let express = require('express')
let router = express.Router()

let exams = []

router.post('/exams', (req, res, next) => {
    if(req.body.length < 3)
        res.status(400).send("400 - Too few exam arguments")
    if(req.body.length > 5)
        res.status(400).send("400 - Too many exam arguments")
    let author_id = parseInt(req.body.author_id)
    if(author_id == NaN)
        res.status(400).send("400 - Bad author_id parameter (NaN)")
    let name = req.body.name
    let exercises = req.body.exercises
    let groups = req.body.groups
    let deadline = req.body.deadline
})