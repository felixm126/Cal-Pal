require('dotenv').config()

const appId = process.env.APPID
const appKey = process.env.APPKEY

// Fetch data for ingredient Object to then send a post request
// Params- name,quantity will be user inputs, qualifiers are optional
async function fetchNutrients(name, quantity, qualifiersURI = []) {
	const parserUrl = `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(
		name
	)}&nutrition-type=logging`

	try {
		const parserResponse = await fetch(parserUrl)
		const parserData = await parserResponse.json()

		// Use optional chaining to evaluate to undefined instead of throwing an error
		const foodId = parserData.hints[0]?.food?.foodId
		const measureURI = parserData.hints[0]?.measures[0]?.uri

		const nutrientUrl = `https://api.edamam.com/api/food-database/v2/nutrients?app_id=${appId}&app_key=${appKey}`

		// Build payload to be sent as a POST request
		// Adopted and adjusted for my specific needs through "https://www.freecodecamp.org/news/make-api-calls-in-javascript/"
		// Originally tried using .then method but code became very verbose and was stuck in promise hell
		const nutrientResponse = await fetch(nutrientUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				// convert obj to strings as is required by edamam
				ingredients: [
					{ quantity, measureURI, foodId, qualifiers: qualifiersURI },
				],
			}),
		})
		const nutrientsData = await nutrientResponse.json()

		return {
			// return obj with these 3 properties to use as needed
			calories: nutrientsData.calories,
			totalNutrients: nutrientsData.totalNutrients,
			totalDaily: nutrientsData.totalDaily,
		}
	} catch (error) {
		console.error('Error fetching nutrient data from Edamam:', error)
	}
}

module.exports = { fetchNutrients }
