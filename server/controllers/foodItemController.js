const { FoodItem } = require('../models')

const getFoodItems = async (req, res) => {
	try {
		const foodItems = await FoodItem.find()
		res.json(foodItems)
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const getFoodItemById = async (req, res) => {
	try {
		const foodItem = await FoodItem.findById(req.params.id)
		if (foodItem) {
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

const updateFoodItem = async (req, res) => {
	try {
		let { id } = req.params
		let foodItem = await FoodItem.findByIdAndUpdate(id, req.body, {
			new: true,
		})
		if (foodItem) {
			return res.status(200).json(foodItem)
		}
		throw new Error('Food item not found')
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const deleteFoodItem = async (req, res) => {
	try {
		const { id } = req.params
		const deleted = await FoodItem.findByIdAndDelete(id)
		if (deleted) {
			return res.status(200).send('Food item deleted')
		}
		throw new error('Food item not found')
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getFoodItems,
	getFoodItemById,
	createFoodItem,
	updateFoodItem,
	deleteFoodItem,
}
