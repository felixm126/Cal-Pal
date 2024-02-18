const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const healthLogSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		weight: { type: Number, required: false },
		caloriesBurned: { type: Number, required: false },
		waterIntake: { type: Number, required: false }, // in liters or ounces
		date: { type: Date, default: Date.now },
	},
	{ timestamps: true }
)

const HealthLog = mongoose.model('HealthLog', healthLogSchema)

module.exports = HealthLog
