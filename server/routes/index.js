const express = require('express')
const router = express.Router()

const foodItems = require('./foodItems')
const foodLogs = require('./foodLogs')
const users = require('./users')

router.use('/fooditems', foodItems)
router.use('/foodlogs', foodLogs)
router.use('/users', users)

module.exports = router
