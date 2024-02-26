async function foodSearchForm() {
	const form = document.getElementById('food-search-modal')
	if (form) {
		form.addEventListener('submit', async function (e) {
			e.preventDefault()
			// get user input values
			const foodName = document.getElementById('food-name').value
			const weight = document.getElementById('weight').value
			const unit = document.getElementById('unit').value

			// combine inputs into ingredient query then encode
			const ingredient = `${weight} ${foodName} ${unit}`
			// takes into account spaces and will be url safe
			const encodedIngredient = encodeURIComponent(ingredient)

			const url = `http://localhost:3001/api/fooditems/info/${encodedIngredient}`

			// fetch method adapted from https://www.freecodecamp.org/news/make-api-calls-in-javascript/

			try {
				const response = await fetch(url, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				})
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				const data = await response.json()
				console.log(data)
				displayNutrients(data, weight, unit)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		})
	}
}

// function to display nutrient values to UI - takes into account users inputted unit and weight
function displayNutrients(data, inputWeight, inputUnit) {
	const measurementsWithName = document.getElementById(
		'nutrient-measurement-name'
	)

	// const weight = document.getElementById('nutrient-weight')
	// const unit = document.getElementById('nutrient-unit')
	// const measurement = document.getElementById('nutrient-measurement')
	const calories = document.getElementById('nutrient-calories')
	const protein = document.getElementById('nutrient-protein')
	const fat = document.getElementById('nutrient-fat')
	const carbohydrates = document.getElementById('nutrient-carbohydrates')

	//API request will return per 100grams, set multiplier accordingly
	const gramsPerUnit = {
		Gram: 1,
		Ounce: 28.3495,
	}
	const multiplier = inputWeight * (gramsPerUnit[inputUnit] || 1)

	// Reset displayed values if multiple searches
	measurementsWithName.innerHTML = 'Food: '
	// measurement.innerHTML = 'Measurement: '
	// weight.innerHTML = 'Weight: '
	// unit.innerHTML = 'Unit: '
	calories.innerHTML = 'Calories: '
	protein.innerHTML = 'Protein: '
	fat.innerHTML = 'Fat: '
	carbohydrates.innerHTML = 'Carbohydrates: '

	// Check to make sure data is available before showing data
	if (data.parsed && data.parsed.length > 0) {
		const parsedSearch = data.parsed[0]

		measurementsWithName.innerHTML = `Food: ${inputWeight} ${inputUnit}s of${
			parsedSearch.food.label || 'Not available'
		}`
		// measurement.innerHTML = `Measurement: ${inputWeight} ${inputUnit}s`
		// unit.innerHTML = `Unit: ${parsedSearch.measure.label || 'Not available'}`
	}

	if (data.hints && data.hints.length > 0) {
		const nutrients = data.hints[0].food.nutrients

		//No more than 2 decimals will be shown with toFixed()
		calories.innerHTML += `${(nutrients.ENERC_KCAL * multiplier).toFixed(
			2
		)} kcal`
		protein.innerHTML += `${(nutrients.PROCNT * multiplier).toFixed(2)} grams`
		fat.innerHTML += `${(nutrients.FAT * multiplier).toFixed(2)} grams`
		carbohydrates.innerHTML += `${(nutrients.CHOCDF * multiplier).toFixed(
			2
		)} grams`
	}
}

function initNavbar() {
	const sidenavElements = document.querySelectorAll('.sidenav')
	M.Sidenav.init(sidenavElements)

	const dropdownElement = document.querySelectorAll('.dropdown-trigger')
	M.Dropdown.init(dropdownElement, {
		constrainWidth: false,
		coverTrigger: false,
		alignment: 'right',
	})
	const modalElements = document.querySelectorAll('.modal')
	M.Modal.init(modalElements)
}

function selectUnit() {
	const selects = document.querySelectorAll('select')
	M.FormSelect.init(selects)
}

document.addEventListener('DOMContentLoaded', function () {
	initNavbar()
	selectUnit()
	foodSearchForm()

	const addFoodButton = document.getElementById('add-button')
	if (addFoodButton) {
		addFoodButton.onclick = function () {
			const instance = M.Modal.getInstance(
				document.getElementById('search-modal')
			)
			instance.open()
		}
	}
})
