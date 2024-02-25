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
router.post('/create', createFoodLog)
router.put('/update/:id', updateFoodLog)
router.delete('/delete/:id', deleteFoodLog)

module.exports = router
