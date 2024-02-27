const { FoodLog } = require('../models')

const getFoodLogsByName = async (req, res) => {
	console.log('here')
	try {
		const foodName = req.query.foodName

		const foodLogs = await FoodLog.find({})
		res.json(foodLogs)
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const getFoodLogById = async (req, res) => {
	try {
		const foodLog = await FoodLog.findById(req.params.id)
		if (foodLog) {
			return res.json(foodLog)
		}
		return res.status(404).send('Food log with the specified ID does not exist')
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const createFoodLog = async (req, res) => {
	try {
		const foodLog = new FoodLog(req.body)
		await foodLog.save()
		return res.status(201).json({ foodLog })
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
}

const updateFoodLog = async (req, res) => {
	try {
		const FoodLog = await FoodLog.findByIdAndUpdate(req.params.id, {})
		if (FoodLog) {
			return res.status(200).json({ FoodLog })
		}
		throw new Error('Food log with the specified ID not found')
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const deleteFoodLog = async (req, res) => {
	try {
		const foodLog = await FoodLog.findByIdAndDelete(req.params.id)
		if (foodLog) {
			return res.status(200).send('Food log deleted')
		}
		throw new Error('Food log with the specified ID not found')
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getFoodLogsByName,
	getFoodLogById,
	createFoodLog,
	updateFoodLog,
	deleteFoodLog,
}
