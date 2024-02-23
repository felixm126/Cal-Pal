const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const FoodLogSchema = new Schema(
	{
		user_id: { type: Schema.Types.ObjectId, ref: 'user' },
		date: { type: Date, default: Date.now }, // set default to current data time
		mealType: {
			type: String,
			enum: ['breakfast', 'lunch', 'dinner', 'snack'], // must pick one option
			required: true,
		},
		foodItems: [
			{
				foodItem: { type: Schema.Types.ObjectId, ref: 'foodItem' },
				quantity: { type: Number, required: true },
				// Set quantity as an array to allow user to set the quantity of each food logged
			},
		],
		notes: { type: String, required: false },
	},
	{ timestamps: true }
)

module.exports = FoodLogSchema
