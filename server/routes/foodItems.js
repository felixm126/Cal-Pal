const express = require('express')
const router = express.Router()

const {
	getEdamamInfo,
	getFoodItemById,
	createFoodItem,
} = require('../controllers/foodItemController')

router.get('/info/:ingredient', getEdamamInfo)
router.get('/info/:id', getFoodItemById)
router.post('/create', createFoodItem)

module.exports = router
