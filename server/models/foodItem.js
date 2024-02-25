const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const FoodItemSchema = new Schema(
	{
		foodId: { type: String, required: true },
		label: { type: Number, required: true },
		nutrients: {
			ENERC_KCAL: { type: String, required: true },
			PROCNT: { type: String, required: true },
			FAT: { type: String, required: true },
			CHOCDF: { type: String, required: true },
		},
	},
	{ timestamps: true }
)

module.exports = FoodItemSchema
