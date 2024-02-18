const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const foodItemSchema = new Schema(
	{
		name: { type: String, required: true },
		category: { type: String, required: true },
		calories: { type: Number, required: true },
		protein: { type: Number, required: true },
		carbs: { type: Number, required: true },
		fats: { type: Number, required: true },
		fiber: { type: Number, required: false },
		sugar: { type: Number, required: false },
		servingSize: { type: String, required: true },
	},
	{ timestamps: true }
)

const FoodItem = mongoose.model('FoodItem', foodItemSchema)

module.exports = FoodItem
