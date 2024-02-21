require('dotenv').config()

const express = require('express')
const fetch = require('node-fetch')
const router = express.Router()

const {
	getFoodItems,
	getFoodItemById,
	createFoodItem,
	updateFoodItem,
	deleteFoodItem,
	fetchMacros,
} = require('../controllers/foodItemController')

router.get('/', getFoodItems)
router.get('/:id', getFoodItemById)

router.post('/', createFoodItem)
router.post('/fetchMacros', fetchMacros)

router.put('/:id', updateFoodItem)
router.delete('/:id', deleteFoodItem)

module.exports = router
