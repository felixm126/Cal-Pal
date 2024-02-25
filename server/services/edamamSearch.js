require('dotenv').config()

const appId = process.env.APPID
const appKey = process.env.APPKEY

const parseEdamam = async (ingredient) => {
	console.log('parseEdamam')
	// set up api get request here to edamam
	// get Name, weight, unit from user
	// const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${appKey}&ingr=${ingredient}&nutrition-type=logging`
	const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(
		ingredient
	)}&nutrition-type=logging`
	try {
		let response = await fetch(url)
		let data = await response.json()

		if (!data || data.hints.length === 0) {
			return null
		}
		return data
	} catch (error) {
		console.error('Error fetching data from Edamam', error)
		throw error
	}
}

module.exports = parseEdamam

// const foodId = data.hints.food.foodId
// const name = data.hints.food.label
// const calories = data.hints.food.nutrients.ENERC_KCAL
// const protein = data.hints.food.nutrients.PROCNT
// const fat = data.hints.food.nutrients.FAT
// const carbohydrates = data.hints.food.nutrients.CHOCDF
