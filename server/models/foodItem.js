const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const FoodItemSchema = new Schema(
	{
		name: { type: String, required: true },
		calories: { type: Number, required: true },
		protein: { type: Number, required: true },
		carbohydrates: { type: Number, required: true },
		fats: { type: Number, required: true },
		servingSize: { type: String, required: true },
		// Edamam post request requirements
		nutrients: [
			{
				quantity: { type: Number, required: true }, // Keep user search to numbered quantity
				measureURI: { type: String, required: true }, // Unit of measurement (eg. grams, ounce, etc)
				foodId: { type: String, required: true }, // Edamams specific food ID
			},
		],
	},
	{ timestamps: true }
)

module.exports = FoodItemSchema
