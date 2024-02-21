const { Schema } = require('mongoose')

const FoodItemSchema = new Schema(
	{
		name: { type: String, required: true },
		// brand: { type: String, required: true },
		// diet/health label?
		calories: { type: Number, required: true },
		protein: { type: Number, required: true },
		carbohydrates: { type: Number, required: true },
		fats: { type: Number, required: true },
		servingSize: { type: String, required: true },
		// Edamam post request reqs
		ingredients: [
			{
				quantity: { type: Number, required: true }, // Keep user search to numbered quantity
				measureURI: { type: String, required: true }, // Unit of measurement (eg. grams, ounce, etc)
				qualifier: [{ type: String, required: true }], // Queries name of food, can be multiple words
				foodId: { type: String, required: true },
			},
		], // Edamams specific food ID
	},
	{ timestamps: true }
)

module.exports = FoodItemSchema
