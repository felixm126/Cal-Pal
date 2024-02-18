const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const foodLogSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		foodItem: { type: Schema.Types.ObjectId, ref: 'FoodItem', required: true },
		quantity: { type: Number, required: true },
		date: { type: Date, default: Date.now },
		mealType: {
			type: String,
			enum: ['breakfast', 'lunch', 'dinner', 'snack'],
			required: true,
		},
	},
	{ timestamps: true }
)

const FoodLog = mongoose.model('FoodLog', foodLogSchema)

module.exports = FoodLog
