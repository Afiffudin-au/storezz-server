var express = require('express')
var router = express.Router()
const { index, actionStatus, viewDetailTransaction } = require('./controller')
const { isLoginAdmin } = require('../middleware/auth')
router.use(isLoginAdmin)
router.get('/', index)
router.put('/status/:id', actionStatus)
router.get('/view_detail/:id', viewDetailTransaction)
module.exports = router
