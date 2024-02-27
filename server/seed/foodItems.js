const db = require('./db')
const FoodLog = require('../models/foodLog')
const User = require('../models/user')

const foodlogs = require('../models/foodlogs')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
	try {
		const foodItems = [
			{
				foodName: '200 gram Chicken',
				calories: 3213.43,
				protein: 241.92,
				fat: 194.28,
				carbohydrates: 117.33,
				edamamFoodId: 'food_bkzqg38b4wc494bwfwrsda9r7pq7',
				date: new Date('Tue, 27 Feb 2024 12:57:35 GMT'),
				createdAt: new Date('Sun, 25 Feb 2024 12:57:35 GMT'),
				updatedAt: new Date('Mon, 26 Feb 2024 04:23:35 GMT'),
				__v: 0,
			},
			{
				foodName: '2221 gram Chicken',
				calories: 35685.18,
				protein: 2686.54,
				fat: 2157.48,
				carbohydrates: 1302.97,
				edamamFoodId: 'food_bkzqg38b4wc494bwfwrsda9r7pq7',
				date: new Date('Tue, 27 Feb 2024 13:02:33 GMT'),
				createdAt: new Date('Mon, 26 Feb 2024 10:02:33 GMT'),
				updatedAt: new Date('Mon, 26 Feb 2024 10:02:33 GMT'),
				__v: 0,
			},
			{
				foodName: '1 gram Pizza',
				calories: 26.8,
				protein: 1.04,
				fat: 1.23,
				carbohydrates: 2.9,
				edamamFoodId: 'food_at830s9amds32fb8w6ufmaopzk8n',
				date: new Date('Tue, 27 Feb 2024 13:03:18 GMT'),
				createdAt: new Date('Tue, 26 Feb 2024 09:03:18 GMT'),
				updatedAt: new Date('Sun, 24 Feb 2024 13:03:18 GMT'),
				__v: 0,
			},
		]

		await foodlogs.insertMany(foodItems)
		console.log('Food items inserted successfully!')
	} catch (error) {
		console.error('Error inserting food items:', error)
	}
}

const run = async () => {
	await main()
	db.close()
}

run()
