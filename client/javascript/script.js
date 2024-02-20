require('dotenv').config()
const parserAppId = process.env.PARSER_APPID
const parserAppKey = process.env.PARSER_APPKEY

const nutritionAppId = process.env.NUTRITION_APPID
const nutritionAppKey = process.env.NUTRITION_APPKEY

const parserApiUrl =
	'https://api.edamam.com/api/food-database/v2/parser?app_id='
const nutritionApiUrl = 'https://api.edamam.com/api/nutrition-data?app_id='

// const outputElement = document.getElementById('output')

// Display api data in an html element
// Get request
// const requestOptions = {
// 	method: 'GET',
// 	headers: {
// 		Authorization: `Bearer ${appKey}`,
// 	},
// }

async function fetchFoodId(type = 'chicken') {
	try {
		const dummyIngr = 'chicken' // Make sure the ingredient is a string
		const response = await fetch(
			`${parserApiUrl}${parserAppId}&app_key=${parserAppKey}&nutrition-type=logging&ingr=${encodeURIComponent(
				type
			)}` // encodeURIComponent allows for spaces when user searches for an ingredient
		) // Used when building a URL from query string params <- adopted from freecodecamp

		if (!response.ok) {
			if (response.status === 404) {
				throw new Error('Search not found')
			} else if (response.status === 500) {
				throw new Error('Server error')
			} else {
				throw new Error('Network response was not ok')
			}
		}
		const data = await response.json()
		console.log(data)
	} catch (error) {
		console.error('Error fetching Food ID:', error)
	}
}

fetchFoodId()
// curl -X 'POST'
//   -H 'accept: application/json' \
//   -H 'Content-Type: application/json' \
//   -d '{
//   "ingredients": [
//     {
//       "quantity": 2,
//       "measureURI": "http://www.edamam.com/ontologies/edamam.owl#Measure_breast",
//       "qualifiers": [
//         "http://www.edamam.com/ontologies/edamam.owl#Qualifier_boneless"
//       ],
//       "foodId": "food_bmyxrshbfao9s1amjrvhoauob6mo"
//     }
//   ]
// }'

async function postData(url, data) {
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		const responseData = await response.json()
		console.log(responseData)
	} catch (error) {
		console.error('Error posting data:', error)
	}
}
postData()

//-> FIRST PARSE INFORMATION THROUGH PARSER -> GET FOOD ID AND URI -> APPLY INTO Recipe_Nutrition

// Need Info for Name Protein Carbohydrates Fats Calories Servingsize
/* type within url after appkey example -- chicken,tyson
&ingr=chicken
&brand=tyson
&nutrition-type=logging
&calories=100%2B
&nutrients%5BFAT%5D=0%2B
&nutrients%5BPROCNT%5D=0%2B
*/

// Nutrition Analysis Showcase
// https://api.edamam.com/api/nutrition-details
// Schema
// {
// {
//   "title": "string",
//   "ingr": [
//     "string"
//   ],
//   "url": "string",
//   "summary": "string",
//   "yield": "string",
//   "time": "string",
//   "img": "string",
//   "prep": "string",
//   "cuisine": "string",
//   "mealtype": "string",
//   "dishtype": "string"
// }

document.addEventListener('DOMContentLoaded', function () {
	// init sidenav
	var elemsSidenav = document.querySelectorAll('.sidenav')
	var instancesSidenav = M.Sidenav.init(elemsSidenav)

	// init dropdown
	var elemsDropdown = document.querySelectorAll('.dropdown-trigger')
	var instancesDropdown = M.Dropdown.init(elemsDropdown, {
		alignment: 'right', // align drop to trigger
	})
})
