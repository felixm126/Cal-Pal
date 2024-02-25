async function foodSearchForm() {
	const form = document.getElementById('food-search-modal')
	if (form) {
		form.addEventListener('submit', async function (e) {
			e.preventDefault()
			const foodName = document.getElementById('food-name').value
			const weight = document.getElementById('weight').value
			const unit = document.getElementById('unit').value

			const queryParameters = new URLSearchParams({
				foodName,
				weight,
				unit,
			})
			const url = `http://localhost:3001/api/fooditems/info/${foodName}`

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
	const calories = document.getElementById('nutrient-calories')
	const protein = document.getElementById('nutrient-protein')
	const fat = document.getElementById('nutrient-fat')
	const carbohydrates = document.getElementById('nutrient-carbohydrates')
	const servingSize = document.getElementById('nutrient-serving-size')

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
