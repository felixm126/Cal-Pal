const express = require('express')
const router = express.Router()

const {
	getHealthLogs,
	getHealthLogById,
	createHealthLog,
	updateHealthLog,
	deleteHealthLog,
} = require('../controllers/healthLogController')

router.get('/', getHealthLogs)
router.get('/:id', getHealthLogById)
router.post('/', createHealthLog)
router.put('/:id', updateHealthLog)
router.delete('/:id', deleteHealthLog)

module.exports = router
