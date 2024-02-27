const db = require('./db')
const User = require('../models/user')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
	try {
		const users = [
			{
				Name: 'Felix Man',
				password: 'apple123',
				username: 'fman111',
				dob: new Date('1995-12-28'),
				activityLevel: 'moderate',
				goals: 'maintain',
			},
		]

		const createdUsers = await User.insertOne(users)
		console.log('User successfully created!', users)
	} catch (error) {
		console.error('Error inserting users:', error)
	}
}

const run = async () => {
	await main()
	db.close()
}

run()
