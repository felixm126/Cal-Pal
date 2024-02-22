const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const MealPlanSchema = new Schema(
	{
		user_id: { type: Schema.Types.ObjectId, ref: 'User' },
		prePlannedMeals: [
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

module.exports = MealPlanSchema
