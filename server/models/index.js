const mongoose = require('mongoose')

const FoodItemSchema = require('./foodItem')
const FoodLogSchema = require('./foodLog')
const UserSchema = require('./user')

const FoodItem = mongoose.model('foodItem', FoodItemSchema)
const FoodLog = mongoose.model('foodLog', FoodLogSchema)
const User = mongoose.model('user', UserSchema)

module.exports = {
	FoodItem,
	FoodLog,
	User,
}
