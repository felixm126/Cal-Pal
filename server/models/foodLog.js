const { Schema } = require('mongoose')

const FoodLogSchema = new Schema(
	{
		user_id: { type: Schema.Types.ObjectId, ref: 'User' },
		foodItems_id: [{ type: Schema.Types.ObjectId, ref: 'FoodItem' }],
		calories: { type: Number, required: true },
		proteins: { type: Number, required: true },
		fats: { type: Number, required: true },
		carbs: { type: Number, required: true },
		date: { type: Date, default: Date.now }, // set default to current data time
		mealType: {
			type: String,
			enum: ['breakfast', 'lunch', 'dinner', 'snack'], // must pick one option
			required: true,
		},
		notes: { type: String, required: false },
	},
	{ timestamps: true }
)

module.exports = FoodlogSchema
