const express = require('express')
const router = express.Router()

const foodItems = require('./foodItems')
const foodLogs = require('./foodLogs')
const healthLogs = require('./healthLogs')
const mealPlans = require('./mealPlans')
const notifications = require('./notifications')
const users = require('./users')

router.use('/foodItems', foodItems)
router.use('/foodLogs', foodLogs)
router.use('/healthLogs', healthLogs)
router.use('/mealPlans', mealPlans)
router.use('/notifications', notifications)
router.use('/users', users)

module.exports = router
