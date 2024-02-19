require('dotenv').config()
const appId = process.env.APPID
const appKey = process.env.APPKEY

const baseUrl = `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${appKey}`

// To get nutritional value use
// https://api.edamam.com/api/food-database/v2/parser?app_id=a534495c&app_key=09ef8301472e328aad72dce617f165c8&

async function getNutritionalValue() {
	const url = `${baseUrl}&`
}
