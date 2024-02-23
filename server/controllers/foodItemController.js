require('dotenv').config()
const { FoodItem } = require('../models')

const getFoodItems = async (req, res) => {
	try {
		const foodItems = await FoodItem.find()
		res.json({ foodItems })
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
		throw new Error('Food item not found')
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

// Fetch data for ingredient Object to then send a post request
// Params- name,quantity, unit will be user inputs
async function createFoodItemNutrients(req, res) {
	const { name, quantity, unit } = req.body
	const appId = process.env.APP_ID // Ensure these are correctly set in your .env file
	const appKey = process.env.APP_KEY

	// Convert the unit to a proper measureURI format if necessary
	const measureURIMap = {
		grams: 'http://www.edamam.com/ontologies/edamam.owl#Measure_gram',
		ounces: 'http://www.edamam.com/ontologies/edamam.owl#Measure_ounce',
		servings: 'http://www.edamam.com/ontologies/edamam.owl#Measure_serving',
	}
	const measureURI =
		measureURIMap[unit.toLowerCase()] ||
		`http://www.edamam.com/ontologies/edamam.owl#Measure_${unit}`

	const parserUrl = `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(
		name
	)}&nutrition-type=logging`

	try {
		const parserResponse = await fetch(parserUrl)
		const parserData = await parserResponse.json()

		if (!parserData || parserData.hints.length === 0) {
			return res
				.status(404)
				.json({ message: 'Food item not found in Edamam database' })
		}
		const foodId = parserData.hints[0]?.food?.foodId
		if (!foodId) {
			return res.status(400).json({ message: 'Food ID not found' })
		}

		const nutrientUrl = `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${appId}&app_key=${appKey}`
		const headersList = {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}

		const nutrientResponse = await fetch(nutrientUrl, {
			method: 'POST',
			headers: headersList,
			body: JSON.stringify({
				ingredients: [{ quantity, measureURI, foodId }],
			}),
		})
		const nutrientsData = await nutrientResponse.json()

		// Create a new food item with the data received
		const foodItem = new FoodItem({
			name: name,
			calories: nutrientsData.calories,
			protein: nutrientsData.totalNutrients.PROCNT.quantity,
			carbohydrates: nutrientsData.totalNutrients.CHOCDF.quantity,
			fats: nutrientsData.totalNutrients.FAT.quantity,
			servingSize: `${quantity} ${unit}`,
		})
		await foodItem.save()

		return res.status(201).json({ foodItem })
	} catch (error) {
		console.error('Error fetching nutrient data from Edamam:', error)
		return res.status(500).json({ error: error.message })
	}
}

module.exports = {
	getFoodItems,
	getFoodItemById,
	createFoodItemNutrients,
	updateFoodItem,
	deleteFoodItem,
}
