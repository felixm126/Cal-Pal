require('dotenv').config()

const express = require('express')
const db = require('./db')
const cors = require('cors')
const logger = require('morgan')

// server/routes/index.js exported all routes, import here
// create modular, mountable route handlers, router instance is a complete middleware and routing system
const routes = require('./server/routes')

const foodLogController = require('./server/controllers/foodLogController')
const userController = require('./server/controllers/userController')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
	res.send('Welcome to Cal Pals Homepage!')
})
// Router will handle api requests to search information
app.use('/api', routes)

// foodlog
app.get('/api/foodlogs/logs', foodLogController.getFoodLogsByName)
app.get('/api/foodlogs/:id', foodLogController.getFoodLogById)
app.post('/api/foodlogs/create', foodLogController.createFoodLog)
app.put('/api/foodlogs/update/:id', foodLogController.updateFoodLog)
app.delete('/delete/:id', foodLogController.deleteFoodLog)

// users
app.get('/api/users/:id', userController.getUserById)
app.get('/api/users/', userController.getUsers)
app.post('/api/users/create', userController.createUser)
app.put('/api/users/update', userController.updateUser)

//Global error handling
app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send('Something broke!')
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
