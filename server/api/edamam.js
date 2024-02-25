require('dotenv').config()

const appId = process.env.APPID
const appKey = process.env.APPKEY

const edamamSearch = async (req, res) => {
	// set up api get request here to edamam
	// get Name, weight, unit from user
	try {
		const ingredient = req.body
		const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(
			ingredient
		)}&nutrition-type=logging`

		let response = await fetch(url)
		let data = await response.json()

		if (!data || data.hints.length === 0) {
			return res
				.status(404)
				.json({ message: 'Food item not found in Edamam database' })
		}
		return res.json(data)

		// const foodId = data.hints.food.foodId
		// const name = data.hints.food.label
		// const calories = data.hints.food.nutrients.ENERC_KCAL
		// const protein = data.hints.food.nutrients.PROCNT
		// const fat = data.hints.food.nutrients.FAT
		// const carbohydrates = data.hints.food.nutrients.CHOCDF
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	edamamSearch,
}
