function convertNutrients(weight, quantity, unit) {
	// returns default per 100 grams
	const measuredInGrams = 100
	const gramsPerOunce = 28.3495
	const gramsPerServing = 286.0718519216374

	let multiplier

	if (unit === 'Gram') {
		multiplier = quantity / measuredInGrams
	} else if (unit === 'Ounce') {
		multiplier = (quantity * gramsPerOunce) / measuredInGrams
	} else if (unit === 'Serving') {
		multiplier = (quantity * gramsPerServing) / measuredInGrams
	} else {
		console.error('Invalid unit, use different unit of measurement')
		return
	}
	const calculatedNutrients = {
		kcal: weight.kcal * multiplier,
		protein: weight.protein * multiplier,
		carbohydrates: weight.carbohydrates * multiplier,
		fats: weight.fats * multiplier, // Assuming fats data is also provided
	}

	return calculatedNutrients
}
