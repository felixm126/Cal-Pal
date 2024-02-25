const express = require('express')
const router = express.Router()

const {
	getMealPlans,
	getMealPlanById,
	createMealPlan,
	updateMealPlan,
	deleteMealPlan,
} = require('../controllers/mealPlanController')

router.get('/', getMealPlans)
router.get('/:id', getMealPlanById)
router.post('/create', createMealPlan)
router.put('/update/:id', updateMealPlan)
router.delete('/delete/:id', deleteMealPlan)

module.exports = router
