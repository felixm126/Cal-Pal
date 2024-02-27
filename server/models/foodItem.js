const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const FoodItemSchema = new Schema(
	{
		foodId: { type: String, required: true },
		label: { type: String, required: true },
		nutrients: {
			ENERC_KCAL: { type: Number, required: true },
			PROCNT: { type: Number, required: true },
			FAT: { type: Number, required: true },
			CHOCDF: { type: Number, required: true },
		},
		foodLogs: [{ type: Schema.Types.ObjectId, ref: 'FoodLog' }],
	},
	{ timestamps: true }
)

module.exports = FoodItemSchema
