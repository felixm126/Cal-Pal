const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const notificationSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		message: { type: String, required: true },
		read: { type: Boolean, default: false },
		date: { type: Date, default: Date.now },
	},
	{ timestamps: true }
)

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification