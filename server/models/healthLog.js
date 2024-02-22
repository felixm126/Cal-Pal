const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const HealthLogSchema = new Schema(
	{
		user_id: { type: Schema.Types.ObjectId, ref: 'User' },
		date: { type: Date, default: Date.now }, // set default to current data time
		weight: { type: Number, required: false },
		bodyMeasurements: { type: String, required: false },
		caloriesBurned: { type: Number, required: false },
		waterIntake: { type: Number, required: false }, // in liters or ounces
	},
	{ timestamps: true }
)

module.exports = HealthLogSchema
