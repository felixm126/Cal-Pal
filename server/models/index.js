const mongoose = require('mongoose')

const FoodItemSchema = require('./foodItem')
const FoodLogSchema = require('./foodLog')
const HealthLogSchema = require('./healthLog')
const MealPlanSchema = require('./mealPlan')
const NotificationSchema = require('./notification')
const UserSchema = require('./user')

const FoodItem = mongoose.model('foodItem', FoodItemSchema)
const FoodLog = mongoose.model('foodLog', FoodLogSchema)
const HealthLog = mongoose.model('healthLog', HealthLogSchema)
const MealPlan = mongoose.model('mealPlan', MealPlanSchema)
const Notification = mongoose.model('notification', NotificationSchema)
const User = mongoose.model('user', UserSchema)

module.exports = {
	FoodItem,
	FoodLog,
	HealthLog,
	MealPlan,
	Notification,
	User,
}
