const { MealPlan } = require('../models')

const getMealPlans = async (req, res) => {
	try {
		const mealPlans = await MealPlan.find()
		res.json(mealPlans)
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const getMealPlanById = async (req, res) => {
	try {
		const mealPlan = await MealPlan.findById(req.params.id)
		if (mealPlan) {
			return res.json(mealPlan)
		}
		return res
			.status(404)
			.send('Meal plan with the specified ID does not exist')
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const createMealPlan = async (req, res) => {
	try {
		const mealPlan = new MealPlan(req.body)
		await mealPlan.save()
		return res.status(201).json({ mealPlan })
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
}

const updateMealPlan = async (req, res) => {
	try {
		const { id } = req.params
		const mealPlan = await MealPlan.findByIdAndUpdate(id, req.body, {
			new: true,
		})
		if (mealPlan) {
			return res.status(200).json(mealPlan)
		}
		throw new Error('Meal plan not found')
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const deleteMealPlan = async (req, res) => {
	try {
		const { id } = req.params
		const deleted = await MealPlan.findByIdAndDelete(id)
		if (deleted) {
			return res.status(200).send('Meal plan deleted')
		}
		throw new Error('Meal plan not found')
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getMealPlans,
	getMealPlanById,
	createMealPlan,
	updateMealPlan,
	deleteMealPlan,
}
