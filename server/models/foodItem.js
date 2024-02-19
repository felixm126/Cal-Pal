const { Schema } = require('mongoose')

const FoodItemSchema = new Schema(
	{
		name: { type: String, required: true },
		calories: { type: Number, required: true },
		protein: { type: Number, required: true },
		carbohydrates: { type: Number, required: true },
		fats: { type: Number, required: true },
		servingSize: { type: String, required: true }, // set to grams? conversion function?
	},
	{ timestamps: true }
)

module.exports = FoodItemSchema
