const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const UserSchema = new Schema(
	{
		Name: { type: String, required: true },
		password: { type: String, required: true },
		username: { type: String, required: true },
		dob: { type: Date, required: true },
		activityLevel: {
			type: String,
			required: false,
			enum: ['sedentary', 'moderate', 'extreme'],
		},
		goals: {
			type: String,
			required: false,
			enum: ['lose', 'maintain', 'gain'],
		}, // use enum to require those choices
	},
	{ timestamps: true }
)

module.exports = UserSchema
