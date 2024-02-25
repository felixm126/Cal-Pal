const express = require('express')
const router = express.Router()

const foodItems = require('./foodItems')
const foodLogs = require('./foodLogs')
const healthLogs = require('./healthLogs')
const mealPlans = require('./mealPlans')
const notifications = require('./notifications')
const users = require('./users')
const edamamSearch = require('./edamamSearch')

// router.get()

router.use('/', (req, res) => {
	res.send('Connected to API')
})
router.use('/fooditems', foodItems)
router.use('/foodlogs', foodLogs)
router.use('/healthlogs', healthLogs)
router.use('/mealplans', mealPlans)
router.use('/notifications', notifications)
router.use('/users', users)
router.use('/edamam', edamamSearch)

module.exports = router
