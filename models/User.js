const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const userSchema = new Schema(
	{
		username: { type: String, required: true }, // unique: true <-- to make sure no users can create the same username
		password: { type: String, required: true }, // unique: true
		email: { type: String, required: true }, // unique: true
		birthday: { type: String, required: true },
		weight: { type: Number },
		activityLevel: {
			type: String,
			required: true,
			enum: ['sedentary', 'moderate', 'extreme'],
		},
		goals: { type: String, required: true, enum: ['lose', 'maintain', 'gain'] },
	},
	{ timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User
