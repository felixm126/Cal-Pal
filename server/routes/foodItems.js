const express = require('express')
const router = express.Router()

const {
	getFoodItems,
	getFoodItemById,
	updateFoodItem,
	deleteFoodItem,
	createFoodItemNutrients,
} = require('../controllers/foodItemController')

router.get('/', getFoodItems)
router.post('/nutrients', createFoodItemNutrients)
router.get('/:id', getFoodItemById)

router.put('/:id', updateFoodItem)
router.delete('/:id', deleteFoodItem)

module.exports = router
