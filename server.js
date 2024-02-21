require('dotenv').config()

const express = require('express')
const db = require('./db')
const cors = require('cors')
const logger = require('morgan')

const foodItems = require('./server/routes/foodItems')
const foodLogs = require('./server/routes/foodLogs')
const healthLogs = require('./server/routes/healthLogs')
const mealPlans = require('./server/routes/mealPlans')
const notifications = require('./server/routes/notifications')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
	res.send('Welcome to Cal Pals Homepage!')
})

app.use('/api/foodItems', foodItems)
app.use('/api/foodLogs', foodLogs)
app.use('/api/healthLogs', healthLogs)
app.use('/api/mealPlans', mealPlans)
app.use('/api/notifications', notifications)

//Global error handling
app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send('Something broke!')
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
