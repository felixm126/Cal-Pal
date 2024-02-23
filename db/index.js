require('dotenv').config()

const mongoose = require('mongoose')
const DATABASE_URI = process.env.DATABASE_URI

async function main() {
	try {
		await mongoose.connect(DATABASE_URI, {
			useNewUrlParser: true, //MongoDB rewrote tool
			useUnifiedTopology: true, // to parse MongoDB connection string
		})
		console.log('Successfully connected to MongoDB Atlas.')
	} catch (e) {
		console.error('Connection error:', e.message)
	}
}
mongoose.set('debug', true)
main()

const db = mongoose.connection
module.exports = db
