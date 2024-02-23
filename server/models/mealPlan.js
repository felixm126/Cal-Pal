const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const MealPlanSchema = new Schema(
	{
		user_id: { type: Schema.Types.ObjectId, ref: 'user' },
		prePlannedMeals: [
			{
				mealType: {
					type: String,
					enum: ['breakfast', 'lunch', 'dinner', 'snack'],
					required: true,
				},
				foodItems: [{ type: Schema.Types.ObjectId, ref: 'foodItem' }],
			},
		],
	},
	{ timestamps: true }
)

module.exports = MealPlanSchema
