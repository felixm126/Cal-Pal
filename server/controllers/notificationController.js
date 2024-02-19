const { Notification } = require('../models')

const getNotifications = async (req, res) => {
	try {
		const notifications = await Notification.find()
		res.json(notifications)
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const getNotificationById = async (req, res) => {
	try {
		const notification = await Notification.findById(req.params.id)
		if (notification) {
			return res.json(notification)
		}
		return res
			.status(404)
			.send('Notification with the specified ID does not exist')
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const createNotification = async (req, res) => {
	try {
		const notification = new Notification(req.body)
		await notification.save()
		return res.status(201).json({ notification })
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
}

const updateNotification = async (req, res) => {
	try {
		let { id } = req.params
		let notification = await Notification.findByIdAndUpdate(id, req.body, {
			new: true,
		})
		if (notification) {
			return res.status(200).json(notification)
		}
		throw new Error('Notification not found')
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const deleteNotification = async (req, res) => {
	try {
		const { id } = req.params
		const deleted = await Notification.findByIdAndDelete(id)
		if (deleted) {
			return res.status(200).send('Notification deleted')
		}
		throw new Error('Notification not found')
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getNotifications,
	getNotificationById,
	createNotification,
	updateNotification,
	deleteNotification,
}
