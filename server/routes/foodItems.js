const express = require('express')
const router = express.Router()

const {
	getFoodItems,
	getFoodItemById,
	createFoodItem,
	updateFoodItem,
	deleteFoodItem,
	getFoodItemNutrients,
} = require('../controllers/foodItemController')

router.get('/', getFoodItems)
router.get('/:id', getFoodItemById)

router.post('/', createFoodItem)
router.post('/nutrients', getFoodItemNutrients)

router.put('/:id', updateFoodItem)
router.delete('/:id', deleteFoodItem)

module.exports = router
