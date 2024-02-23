require('dotenv').config()

const express = require('express')
const db = require('./db')
const cors = require('cors')
const logger = require('morgan')

// server/routes/index.js exported all routes, import here
// create modular, mountable route handlers, a router instance is a complete middleware and routing system
const routes = require('./server/routes')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
	res.send('Welcome to Cal Pals Homepage!')
})

// Getting all routes from server/routes/index.js to keep files cleaner
app.use('/api', routes)

//Global error handling
app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send('Something broke!')
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
