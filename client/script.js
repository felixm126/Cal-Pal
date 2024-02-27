let logInformation = {}

async function foodSearchForm() {
	const form = document.getElementById('food-search-modal')
	if (form) {
		form.addEventListener('submit', async function (e) {
			// form cannot be submitted unless correct
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

				// supply function with 3 parameters
				displayNutrients(data, weight, unit)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
			// after user clicks submit, form will close
			const instance = M.Modal.getInstance(
				document.getElementById('search-modal')
			)
			instance.close()
			const nutrientInfoContainer = document.getElementById(
				'nutrient-info-container'
			)
			nutrientInfoContainer.style.display = 'block'
			const addFoodContainer = document.getElementById('add-food-container')
			addFoodContainer.style.display = 'block'
		})
	}
}

async function addToFoodLog(data) {
	try {
		const response = await fetch('http://localhost:3001/api/foodlogs/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		if (!response.ok) {
			throw new Error('Failed to add food log entry')
		}
		const foodLogData = await response.json()
		return foodLogData
	} catch (error) {
		console.error('Error:', error)
	}
}

// function to display nutrient values to UI - takes into account users inputted unit and weight
function displayNutrients(data, inputWeight, inputUnit) {
	const measurementsWithName = document.getElementById(
		'nutrient-measurement-name'
	)

	const calories = document.getElementById('nutrient-calories')
	const protein = document.getElementById('nutrient-protein')
	const fat = document.getElementById('nutrient-fat')
	const carbohydrates = document.getElementById('nutrient-carbohydrates')

	//API request will return per 100grams, set multiplier accordingly
	const gramsPerUnit = {
		Gram: 1,
		Ounce: 28.3495,
	}
	const weightInGrams = inputWeight * (gramsPerUnit[inputUnit] || 1)
	const multiplier = weightInGrams / 10

	// Reset displayed values if multiple searches
	measurementsWithName.innerHTML = 'Food: '
	calories.innerHTML = 'Calories: '
	protein.innerHTML = 'Protein: '
	fat.innerHTML = 'Fat: '
	carbohydrates.innerHTML = 'Carbohydrates: '

	// Check to make sure data is available before showing data
	if (data.parsed && data.parsed.length > 0) {
		const parsedSearch = data.parsed[0]

		measurementsWithName.innerHTML = `Food: ${inputWeight} ${inputUnit}s of ${
			parsedSearch.food.label || 'Not available'
		}`
		logInformation.foodName = `${inputWeight} ${inputUnit} ${parsedSearch.food.label}`
	}

	if (data.hints && data.hints.length > 0) {
		const nutrients = data.hints[0].food.nutrients

		//No more than 2 decimals will be shown with toFixed()
		calories.innerHTML += `${(nutrients.ENERC_KCAL * multiplier).toFixed(
			2
		)} kcal`
		logInformation.calories = parseFloat(
			(nutrients.ENERC_KCAL * multiplier).toFixed(2)
		)

		protein.innerHTML += `${(nutrients.PROCNT * multiplier).toFixed(2)} grams`
		logInformation.protein = parseFloat(
			(nutrients.PROCNT * multiplier).toFixed(2)
		)
		fat.innerHTML += `${(nutrients.FAT * multiplier).toFixed(2)} grams`
		logInformation.fat = parseFloat((nutrients.FAT * multiplier).toFixed(2))
		carbohydrates.innerHTML += `${(nutrients.CHOCDF * multiplier).toFixed(
			2
		)} grams`
		logInformation.carbohydrates = parseFloat(
			(nutrients.CHOCDF * multiplier).toFixed(2)
		)
		console.log(logInformation)
	}
}

function initAllModals() {
	// Initialize sidenav
	const sidenavElements = document.querySelectorAll('.sidenav')
	M.Sidenav.init(sidenavElements)

	// Initialize Dropdown
	const dropdownElements = document.querySelectorAll('.dropdown-trigger')
	M.Dropdown.init(dropdownElements, {
		constrainWidth: false,
		coverTrigger: false,
		alignment: 'right',
	})

	// Initialize modal
	const modalElements = document.querySelectorAll('.modal')
	M.Modal.init(modalElements)

	// initialize selects form
	const selects = document.querySelectorAll('select')
	M.FormSelect.init(selects)

	// close modal
	const searchModalElement = document.getElementById('search-modal')
	if (searchModalElement) {
		const closeModalButton = searchModalElement.querySelector('.close-modal')
		if (closeModalButton) {
			closeModalButton.addEventListener('click', function () {
				const instance = M.Modal.getInstance(searchModalElement)
				instance.close()
				document.getElementById('nutrient-info-container').style.display =
					'block'
				document.getElementById('add-food-container').style.display = 'block'
			})
		}
	}
}

// combine event listeners to one function
function setupEventListeners() {
	// Search Modal
	const searchButton = document.getElementById('search-button')
	const searchModal = M.Modal.getInstance(
		document.getElementById('search-modal')
	)
	if (searchButton) {
		searchButton.addEventListener('click', function () {
			searchModal.open()
		})
	}

	// Add Food Button
	const addFoodButton = document.getElementById('add-food-btn')
	if (addFoodButton) {
		addFoodButton.addEventListener('click', function () {
			// add food info to db
			addToFoodLog(logInformation)

			document.getElementById('nutrient-info-container').style.display = 'block'
			document.getElementById('add-food-container').style.display = 'block'
			searchModal.close()
		})
	}

	// Navigation Buttons
	const homeButton = document.getElementById('home')
	const foodLogButton = document.getElementById('food-log')
	const profileButton = document.getElementById('profile-settings')

	if (homeButton) {
		homeButton.addEventListener('click', function () {
			// refresh home page if clicked when in home already
			window.location.reload()
		})
	} else if (foodLogButton) {
		// switch to food-log page
		foodLogButton.addEventListener('click', function () {
			window.location.href = 'html/food-log.html'
		})
	} else if (profileButton) {
		// switch to profile
		profileButton.addEventListener('click', function () {
			window.location.href = 'html/profile-settings.html'
		})
	}
}

document.addEventListener('DOMContentLoaded', function () {
	foodSearchForm()
	initAllModals()
	setupEventListeners()
})
