const express = require('express')
const router = express.Router()

const {
	getFoodItems,
	getEdamamInfo,
	getFoodItemById,
	createFoodItem,
	updateFoodItem,
	deleteFoodItem,
} = require('../controllers/foodItemController')

router.get('/', getFoodItems)
router.get('/info/:ingredient', getEdamamInfo)
router.get('/:id', getFoodItemById)
router.post('/create', createFoodItem)
router.put('/update/:id', updateFoodItem)
router.delete('/delete/:id', deleteFoodItem)

module.exports = router
