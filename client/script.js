require('dotenv').config()
const appId = process.env.APPID
const appKey = process.env.APPKEY

const baseUrl = `https://api.edamam.com/api/food-database/v2/parser?app_id=${appId}&app_key=${appKey}`

async function getNutritionalValue() {
	const url = `${baseUrl}&`
}
