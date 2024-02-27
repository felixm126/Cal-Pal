require('dotenv').config()
const { FoodItem } = require('../models')
const parseEdamam = require('../services/edamamSearch')

const getEdamamInfo = async (req, res) => {
	console.log('get edamam info')
	try {
		const params = req.params.ingredient
		console.log(params)
		const data = await parseEdamam(params)

		if (!data) {
			return res
				.status(404)
				.json({ message: 'Food item not found in Edamam database' })
		}
		return res.json(data)
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const getFoodItemById = async (req, res) => {
	try {
		const foodItem = await FoodItem.findById(req.params.id)
		if ({ foodItem }) {
			return res.json(foodItem)
		}
		return res
			.status(404)
			.send('Food item with the specified ID does not exist')
	} catch (error) {
		return res.status(500).send(error.message)
	}
}
const createFoodItem = async (req, res) => {
	try {
		const foodItem = await new FoodItem(req.body)
		await foodItem.save()
		return res.status(201).json({ foodItem })
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
}

module.exports = {
	getEdamamInfo,
	getFoodItemById,
	createFoodItem,
}
