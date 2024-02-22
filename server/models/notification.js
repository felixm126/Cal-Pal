const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const NotificationSchema = new Schema(
	{
		user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		reminders: { type: String, required: true },
		achievements: { type: String, required: false },
		motivationalMessage: { type: String, required: true },
		date: { type: Date, default: Date.now }, // set default to current date time
	},
	{ timestamps: true }
)

module.exports = NotificationSchema
