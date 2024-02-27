const express = require('express')
const router = express.Router()

const {
	getFoodLogsByName,
	getFoodLogById,
	createFoodLog,
	updateFoodLog,
	deleteFoodLog,
} = require('../controllers/foodLogController')

router.get('/logs', getFoodLogsByName)
router.get('/:id', getFoodLogById)
router.post('/create', createFoodLog)
router.put('/update/:id', updateFoodLog)
router.delete('/delete/:id', deleteFoodLog)

module.exports = router
