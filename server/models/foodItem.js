const { Schema } = require('mongoose')

const FoodItemSchema = new Schema(
	{
		name: { type: String, required: true },
		// brand: { type: String, required: true },
		// diet/health label?
		calories: { type: Number, required: true },
		protein: { type: Number, required: true },
		carbohydrates: { type: Number, required: true },
		fats: { type: Number, required: true },
		servingSize: { type: String, required: true },
	},
	{ timestamps: true }
)

module.exports = FoodItemSchema
