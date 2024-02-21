const { Schema } = require('mongoose')

const FoodLogSchema = new Schema(
	{
		user_id: { type: Schema.Types.ObjectId, ref: 'User' },
		date: { type: Date, default: Date.now }, // set default to current data time

		mealType: {
			type: String,
			enum: ['breakfast', 'lunch', 'dinner', 'snack'], // must pick one option
			required: true,
		},
		foodItems_id: [{ type: Schema.Types.ObjectId, ref: 'FoodItem' }],
		quantity: { type: Number, required: true },
		notes: { type: String, required: false },
	},
	{ timestamps: true }
)

module.exports = FoodLogSchema
