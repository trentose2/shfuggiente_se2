var express = require('express')
var router = express.Router()

router.get('/',function(req,res){
    res.send('Hello World v1!')
});

router.use('/', require('./users').router)
router.use('/', require('./submissions').router)


module.exports.router = router
