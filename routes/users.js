let express = require('express')
let router = express.Router()

router.get('/users', (req, res, next) => {
    res.status(500).send('Something broke')
})

module.exports = router