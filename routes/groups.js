let express = require('express')
let router = express.Router()

var groups = [{
    "id": 1,
    "name": "group1"
},
{
    "id": 2,
    "name": "group2"
}];

router.get('/groups', (req, res, next) => {
    res.status(200).send(groups)
})

module.exports = router