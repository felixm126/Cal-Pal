const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const FoodLogSchema = new Schema(
	{
		user_id: { type: Schema.Types.ObjectId, ref: 'User' },
		date: { type: Date, default: Date.now }, // set default to current data time
		foodName: { type: String, required: true },
		calories: { type: Number, required: true },
		protein: { type: Number, required: true },
		fat: { type: Number, required: true },
		carbohydrates: { type: Number, required: true },
		edamamFoodId: { type: String, required: true },
		notes: { type: String, required: false },
	},
	{ timestamps: true }
)

module.exports = FoodLogSchema
