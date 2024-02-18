const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const mealPlanSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		date: { type: Date, required: true },
		meals: [
			{
				mealType: {
					type: String,
					enum: ['breakfast', 'lunch', 'dinner', 'snack'],
					required: true,
				},
				foodItems: [{ type: Schema.Types.ObjectId, ref: 'FoodItem' }],
			},
		],
	},
	{ timestamps: true }
)

const MealPlan = mongoose.model('MealPlan', mealPlanSchema)

module.exports = MealPlan
