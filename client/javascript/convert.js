// function convertNutrients(nutrients, weight, unit) {
// 	// Set conversion standard to grams, API will return per 100g
// 	const gramsPerUnit = {
// 		Gram: 1,
// 		Ounce: 28.3495,
// 		Serving: 286.0718519216374,
// 	}

// 	const multiplier = gramsPerUnit[unit] // check condition to see if unit is within object
// 		? (weight * gramsPerUnit[unit]) / 100 // if true, calculates multiplier
// 		: null // else will return null

// 	if (multiplier === null) {
// 		throw new Error('Invalid unit, choose another unit of measure')
// 	}
// 	const calculatedNutrients = {
// 		ENERC_KCAL: nutrients.ENERC_KCAL * multiplier,
// 		PROCNT: nutrients.PROCNT * multiplier,
// 		FAT: nutrients.FAT * multiplier,
// 		CHOCDF: nutrients.CHOCDF * multiplier,
// 	}

// 	return calculatedNutrients
// }
