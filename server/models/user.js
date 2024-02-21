const { Schema } = require('mongoose')

const UserSchema = new Schema(
	{
		username: { type: String, required: true }, // unique: true ?<-- to make sure no users can create the same username
		password: { type: String, required: true }, // unique: true ?<-- can we log info?
		email: { type: String, required: true }, // unique: true
		dob: { type: Date, required: true },
		activityLevel: {
			type: String,
			required: true,
			enum: ['sedentary', 'moderate', 'extreme'],
		},
		goals: { type: String, required: true, enum: ['lose', 'maintain', 'gain'] }, // use enum to require those choices
	},
	{ timestamps: true }
)

module.exports = UserSchema
