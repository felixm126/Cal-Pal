const express = require('express')
const router = express.Router()

const {
	getFoodLogs,
	getFoodLogById,
	createFoodLog,
	updateFoodLog,
	deleteFoodLog,
} = require('../controllers/foodLogController')

router.get('/', getFoodLogs)
router.get('/:id', getFoodLogById)
router.post('/', createFoodLog)
router.put('/:id', updateFoodLog)
router.delete('/:id', deleteFoodLog)

module.exports = router
