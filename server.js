require('dotenv').config()

const express = require('express')
const db = require('./db')
const cors = require('cors')
const logger = require('morgan')

// Controllers
const {
	getFoodItems,
	getFoodItemById,
	createFoodItem,
	updateFoodItem,
	deleteFoodItem,
} = require('./controllers/foodItemController')

const {
	getFoodLogs,
	getFoodLogById,
	createFoodLog,
	updateFoodLog,
	deleteFoodLog,
} = require('./controllers/foodLogController')

const {
	getHealthLogs,
	getHealthLogById,
	createHealthLog,
	updateHealthLog,
	deleteHealthLog,
} = require('./controllers/healthLogController')

const {
	getMealPlans,
	getMealPlanById,
	createMealPlan,
	updateMealPlan,
	deleteMealPlan,
} = require('./controllers/mealPlanController')

const {
	getNotifications,
	getNotificationById,
	createNotification,
	updateNotification,
	deleteNotification,
} = require('./controllers/notificationController')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
	res.send('Welcome to Cal Pals Homepage!')
})

app.get('/api/foodItems', getFoodItems)
app.get('/api/foodItems/:id', getFoodItemById)
app.post('/api/foodItems', createFoodItem)
app.put('/api/foodItems/:id', updateFoodItem)
app.delete('/api/foodItems/:id', deleteFoodItem)

app.get('/api/foodLogs', getFoodLogs)
app.get('/api/foodLogs/:id', getFoodLogById)
app.post('/api/foodLogs', createFoodLog)
app.put('/api/foodLogs/:id', updateFoodLog)
app.delete('/api/foodLogs/:id', deleteFoodLog)

app.get('/api/healthLogs', getHealthLogs)
app.get('/api/healthLogs/:id', getHealthLogById)
app.post('/api/healthLogs', createHealthLog)
app.put('/api/healthLogs/:id', updateHealthLog)
app.delete('/api/healthLogs/:id', deleteHealthLog)

app.get('/api/mealPlans', getMealPlans)
app.get('/api/mealPlans/:id', getMealPlanById)
app.post('/api/mealPlans', createMealPlan)
app.put('/api/mealPlans/:id', updateMealPlan)
app.delete('/api/mealPlans/:id', deleteMealPlan)

app.get('/api/notifications', getNotifications)
app.get('/api/notifications/:id', getNotificationById)
app.post('/api/notifications', createNotification)
app.put('/api/notifications/:id', updateNotification)
app.delete('/api/notifications/:id', deleteNotification)

//Global error handling
app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send('Something broke!')
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
