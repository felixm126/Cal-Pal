const express = require('express')
const router = express.Router()

const {
	getNotifications,
	getNotificationById,
	createNotification,
	updateNotification,
	deleteNotification,
} = require('../controllers/notificationController')

router.get('/', getNotifications)
router.get('/:id', getNotificationById)
router.post('/create', createNotification)
router.put('/update/:id', updateNotification)
router.delete('/delete/:id', deleteNotification)

module.exports = router
