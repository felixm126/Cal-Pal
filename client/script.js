async function foodSearchForm() {
	const form = document.getElementById('food-search-modal')
	if (form) {
		form.addEventListener('submit', async function (e) {
			e.preventDefault() // If form is not properly filled out, will not submit

			// Get values from the form and make a POST req
			const foodName = document.getElementById('food-name').value
			const weight = document.getElementById('weight').value
			const unit = document.getElementById('unit').value

			// Adopted example from "https://www.freecodecamp.org/news/make-api-calls-in-javascript/"
			try {
				const response = await fetch('/api/foodItems/nutrients', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						foodName,
						weight,
						unit,
					}),
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
	const calories = document.getElementById('nutrient-calories')
	const protein = document.getElementById('nutrient-protein')
	const fat = document.getElementById('nutrient-fat')
	const carbohydrates = document.getElementById('nutrient-carbohydrates')
	const servingSize = document.getElementById('nutrient-serving-size')

	// Use `parseFloat().toFixed(2)` to format numbers to two decimal places
	foodName.textContent = `Food Name: ${data.foodName || 'Not found'}`

	calories.textContent = `Calories: ${
		parseFloat(data.calories).toFixed(2) || 'Not found'
	}`

	protein.textContent = `Protein: ${parseFloat(data.protein.quantity).toFixed(
		2
	)} ${data.protein.unit || ''}`

	fat.textContent = `Fat: ${parseFloat(data.fat.quantity).toFixed(2)} ${
		data.fat.unit || ''
	}`

	carbohydrates.textContent = `Carbohydrates: ${parseFloat(
		data.carbohydrates.quantity
	).toFixed(2)}${data.carbohydrates.unit || 'Not found'}`

	servingSize.textContent = `Serving Size: ${data.servingSize || 'Not found'}`
}

function initNavbar() {
	// initialize sidenav
	const sidenavElements = document.querySelectorAll('.sidenav')
	M.Sidenav.init(sidenavElements)

	// initialize the dropdown
	const dropdownElements = document.querySelectorAll('.dropdown-trigger')
	M.Dropdown.init(dropdownElements, {
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
})
