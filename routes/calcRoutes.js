const express = require('express')
const { calculate } = require('../controllers/calcController')

//router object
const router = express.Router()


router.post('/add', calculate)


module.exports = router
