async function foodSearchForm() {
	const form = document.getElementById('food-search-modal')
	if (form) {
		form.addEventListener('submit', async function (e) {
			e.preventDefault()
			const foodName = document.getElementById('food-name').value
			const weight = document.getElementById('weight').value
			const unit = document.getElementById('unit').value
			const ingredient = `${weight} ${foodName} ${unit}`
			const encodedIngredient = encodeURIComponent(ingredient)

			const url = `http://localhost:3001/api/fooditems/info/${encodedIngredient}`

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
				displayNutrients(data)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		})
	}
}

function displayNutrients(data) {
	const foodName = document.getElementById('nutrient-food-name')
	const weight = document.getElementById('nutrient-weight')
	const unit = document.getElementById('nutrient-unit')
	const calories = document.getElementById('nutrient-calories')
	const protein = document.getElementById('nutrient-protein')
	const fat = document.getElementById('nutrient-fat')
	const carbohydrates = document.getElementById('nutrient-carbohydrates')

	// Reset displayed values if multiple searches
	foodName.innerHTML = 'Food: '
	weight.innerHTML = 'Weight: '
	unit.innerHTML = 'Unit: '
	calories.innerHTML = 'Calories: '
	protein.innerHTML = 'Protein: '
	fat.innerHTML = 'Fat: '
	carbohydrates.innerHTML = 'Carbohydrates: '

	// Check to make sure data is available before showing data
	if (data.parsed && data.parsed.length > 0) {
		const parsedSearch = data.parsed[0]

		foodName.innerHTML = `Food: ${parsedSearch.food.label || 'Not available'}`
		weight.innerHTML = `Weight: ${
			parsedSearch.measure.weight.toFixed(2) || 'Not available' //Only show 2 decimal values max
		}`
		unit.innerHTML = `Unit: ${parsedSearch.measure.label || 'Not available'}`
	}

	if (data.hints && data.hints.length > 0) {
		const nutrients = data.hints[0].food.nutrients

		calories.innerHTML = `Calories: ${
			nutrients.ENERC_KCAL ? nutrients.ENERC_KCAL.toFixed(2) : 'Not available'
		} kcal`
		protein.innerHTML = `Protein: ${
			nutrients.PROCNT ? nutrients.PROCNT.toFixed(2) : 'Not available'
		} g`
		fat.innerHTML = `Fat: ${
			nutrients.FAT ? nutrients.FAT.toFixed(2) : 'Not available'
		} g`
		carbohydrates.innerHTML = `Carbohydrates: ${
			nutrients.CHOCDF ? nutrients.CHOCDF.toFixed(2) : 'Not available'
		} g`
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
