require('dotenv').config()
const mongoose = require('mongoose')
const MongoURI = process.env.MONGODB_URI

mongoose
	.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Successfully connected to MongoDB Atlas.')
	})
	.catch((e) => {
		console.error('Connection error', e.message)
	})

mongoose.set('debug', true)
const db = mongoose.connection

module.exports = db
