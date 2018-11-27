let express = require('express')
let router = express.Router()

let exams = []

// /exams endpoint
router.post('/exams', (req, res, next) => {

    //check body params number (3 to 5)
    if (req.body.length < 3)
        res.status(400).send("400 - Too few exam arguments")
    if (req.body.length > 5)
        res.status(400).send("400 - Too many exam arguments")

    //check author id validity (integer >= 0)
    let author_id = parseInt(req.body.author_id)
    if (author_id == NaN)
        res.status(400).send("400 - Bad author_id parameter (NaN) o absent")   

    //check name validity (numbers and characters are allowed, objects are not)    
    let name = req.body.name
    if (typeof name === "object" || name instanceof Object)
        res.status(400).send("400 - Bad name, object are not allowed")

    //check exercises validity (array of int) if in the body  
    let exercises = req.body.exercises   
    if (exercises == undefined)
        exercises = []
    else {
        if (exercises.constructor !== Array)
            res.status(400).send("400 - Bad exercises, not an array")
        exercises.forEach(element => {
            if (!element.isInteger)
                res.status(400).send("400 - Bad exercises, not integer id")
            if (element < 0)
                res.status(400).send("400 - Bad exercises, id lower than 0")
        });
    }

    //check groups validity (array of int) if in the body
    let groups = req.body.groups
    if (groups == undefined)
        groups = []
    else {
        if (groups.constructor !== Array)
            res.status(400).send("400 - Bad groups, not an array")
        groups.forEach(element => {
            if (!element.isInteger)
                res.status(400).send("400 - Bad groups, not integer id")
            if (element < 0)
                res.status(400).send("400 - Bad groups, id lower than 0")
        });
    }

    //check date-time validity
    let deadline = new Date(req.body.deadline)
    if (!(deadline instanceof Date))
        res.status(400).send("400 - Bade date format")

    //creating and adding new exam
    let tmp = {
        id: Math.floor(Math.random()*10000000),
        author_id: author_id,
        name: name,
        exercises: exercises,
        groups: groups,
        deadline: deadline
    }

    //push exam in the "database"
    exams.push(tmp)

    //return confirmation if everithing is fine
    res.status(200).send(tmp.id)

})

// /exams/:id endpoint
router.get('/exams/:id', (req, res, next) => {
    let id = parseInt(req.params.id)
    let examsMatching = exams.filter(elem => {
        return elem.id === id
    })
    if(examsMatching.length === 1) {
        res.status(200).send(examsMatching[0])
    } else {
        res.status(404).send('404 - Resource not found')
    }
})