const db = require('./db')

const FoodLog = require('../models/foodLog')
const user = require('./user')

const main = async () => {
	try {
		const fman111 = await user.find({ name: 'Felix Man' })

		const foodLogs = [
			{
				foodName: '200 gram Chicken',
				calories: 3213.43,
				protein: 241.92,
				fat: 194.28,
				carbohydrates: 117.33,
				edamamFoodId: 'food_bkzqg38b4wc494bwfwrsda9r7pq7',
				date: new Date('2024-02-27T12:57:35Z'),
				user: fman111,
			},
			{
				foodName: '2221 gram Chicken',
				calories: 35685.18,
				protein: 2686.54,
				fat: 2157.48,
				carbohydrates: 1302.97,
				edamamFoodId: 'food_bkzqg38b4wc494bwfwrsda9r7pq7',
				date: new Date('2024-02-27T13:02:33Z'),
				user: fman111,
			},
			{
				foodName: '1 gram Pizza',
				calories: 26.8,
				protein: 1.04,
				fat: 1.23,
				carbohydrates: 2.9,
				edamamFoodId: 'food_at830s9amds32fb8w6ufmaopzk8n',
				date: new Date('2024-02-27T13:03:18Z'),
				user: fman111,
			},
		]

		await FoodLog.insertMany(foodLogs)
		console.log('Food logs inserted successfully!')
	} catch (error) {
		console.error('Error inserting food logs:', error)
	}
}

const run = async () => {
	await main()
	db.close()
}

main()
