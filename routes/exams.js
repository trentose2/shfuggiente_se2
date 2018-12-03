let express = require('express')
let router = express.Router()

let exams = [
    {
        id: 2,
        author_id: 3,
        name: "Software Engineering II - 15/11/2018",
        exercises: [43, 87, 62, 87, 98],
        groups: [13, 15, 17],
        deadline: '2019-07-21T17:32:28.000Z'
    }
]

// /exams endpoint
router.post('/exams', (req, res) => {

    //check body params number (3 to 5)
    if (Object.keys(req.body).length < 3)
        return res.status(400).send("400 - Too few exam arguments")
    if (Object.keys(req.body).length > 5)
        return res.status(400).send("400 - Too many exam arguments")

    //check author id validity (integer >= 0)
    let author_id = parseInt(req.body.author_id)
    if (isNaN(author_id))
        return res.status(400).send("400 - Bad author_id parameter (NaN) o absent")
    if (author_id < 0)
        return res.status(400).send("400 - Bad author_id parameter (negative)")

    //check name validity (numbers and characters are allowed, objects are not)    
    let name = req.body.name
    if (typeof name === "object" || name instanceof Object)
        return res.status(400).send("400 - Bad name, object are not allowed")

    //check exercises validity (array of int) if in the body  
    let exercises = req.body.exercises
    if (exercises == undefined)
        exercises = []
    else {
        if (exercises.constructor !== Array)
            return res.status(400).send("400 - Bad exercises, not an array")
        exercises.forEach(element => {
            if (!Number.isInteger(element))
                return res.status(400).send("400 - Bad exercises, not integer id")
            if (element < 0)
                return res.status(400).send("400 - Bad exercises, id lower than 0")
        });
    }

    //check groups validity (array of int) if in the body
    let groups = req.body.groups
    if (groups == undefined)
        groups = []
    else {
        if (groups.constructor !== Array)
            return res.status(400).send("400 - Bad groups, not an array")
        groups.forEach(element => {
            if (!Number.isInteger(element))
                return res.status(400).send("400 - Bad groups, not integer id")
            if (element < 0)
                return res.status(400).send("400 - Bad groups, id lower than 0")
        });
    }

    //check date-time validity
    if (req.body.deadline.length != 24 || isNaN(Date.parse(req.body.deadline))) // controllo la lunghezza della stringa date-time e che sia convertibile in una data
        return res.status(400).send("400 - Bade date format")
    let deadline = new Date(req.body.deadline)

    //creating and adding new exam
    let tmp = {
        id: Math.floor(Math.random() * 10000000),
        author_id: author_id,
        name: name,
        exercises: exercises,
        groups: groups,
        deadline: deadline
    }

    //push exam in the "database"
    exams.push(tmp)

    //return confirmation if everithing is fine
    return res.status(200).send({ id: tmp.id })

})

// /exams/:id endpoint
router.get('/exams/:id', (req, res) => {

    let id = parseInt(req.params.id)
    if (isNaN(id))
        return res.status(400).send('400 - Bad request (non integer id)')
    if (id < 0)
        return res.status(400).send('400 - Bad request (negative id)')

    let examsMatching = exams.filter(elem => {
        return elem.id === id
    })
    if (examsMatching.length === 1) {
        return res.status(200).send(examsMatching[0])
    } else {
        return res.status(404).send('404 - Resource not found')
    }

})

router.put('/exams/:id', (req, res) => {

    let id = parseInt(req.params.id)
    if (isNaN(id))
        return res.status(400).send('400 - Bad request (non integer id)')
    if (id < 0)
        return res.status(400).send('400 - Bad request (negative id)')

    let examsMatching = exams.filter(elem => {
        return elem.id === id
    })
    if (examsMatching.length !== 1) {
        return res.status(404).send('404 - Resource not found')
    } else {

        // doing same chaecks as POST
        if (Object.keys(req.body).length < 3)
            return res.status(400).send("400 - Too few exam arguments")
        if (Object.keys(req.body).length > 5)
            return res.status(400).send("400 - Too many exam arguments")

        let author_id = parseInt(req.body.author_id)
        if (isNaN(author_id))
            return res.status(400).send("400 - Bad author_id parameter (NaN) o absent")
        if (author_id < 0)
            return res.status(400).send("400 - Bad author_id parameter (negative)")

        let name = req.body.name
        if (typeof name === "object" || name instanceof Object)
            return res.status(400).send("400 - Bad name, object are not allowed")

        let exercises = req.body.exercises
        if (exercises == undefined)
            exercises = []
        else {
            if (exercises.constructor !== Array)
                return res.status(400).send("400 - Bad exercises, not an array")
            exercises.forEach(element => {
                if (!Number.isInteger(element))
                    return res.status(400).send("400 - Bad exercises, not integer id")
                if (element < 0)
                    return res.status(400).send("400 - Bad exercises, id lower than 0")
            });
        }

        let groups = req.body.groups
        if (groups == undefined)
            groups = []
        else {
            if (groups.constructor !== Array)
                return res.status(400).send("400 - Bad groups, not an array")
            groups.forEach(element => {
                if (!Number.isInteger(element))
                    return res.status(400).send("400 - Bad groups, not integer id")
                if (element < 0)
                    return res.status(400).send("400 - Bad groups, id lower than 0")
            });
        }

        if (req.body.deadline.length != 24 || isNaN(Date.parse(req.body.deadline))) // controllo la lunghezza della stringa date-time e che sia convertibile in una data
            return res.status(400).send("400 - Bade date format")
        let deadline = new Date(req.body.deadline)

        exams.filter(elem => {
            if(elem.id === id){
                elem.author_id = req.body.author_id
                elem.name = req.name
                elem.exercises =  req.exercises
                elem.groups = req.groups
                elem.deadline = req.deadline
            }
        })

        return res.status(200).send(examsMatching[0])
    }

})

module.exports = router