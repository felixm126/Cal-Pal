// fetchFoodMacros('chicken')

// const outputElement = document.getElementById('output')

// Display api data in an html element
// Get request
// const requestOptions = {
// 	method: 'GET',
// 	headers: {
// 		Authorization: `Bearer ${appKey}`,
// 	},
// }
// async function postData(url, data) {
// 	try {
// 		const response = await fetch(url, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify(data),
// 		})
// 		if (!response.ok) {
// 			throw new Error('Network response was not ok')
// 		}
// 		const responseData = await response.json()
// 		console.log(responseData)
// 	} catch (error) {
// 		console.error('Error posting data:', error)
// 	}
// }

function initNavbar() {
	// initialize sidenav
	const sidenavElements = document.querySelectorAll('.sidenav')
	M.Sidenav.init(sidenavElements)

	// initialize the dropdown
	const dropdownElements = document.querySelectorAll('.drop-trigger')
	M.Dropdown.init(dropdownElements, {
		constrainWidth: false,
		coverTrigger: false,
		alignment: 'right',
	})
	const modalElements = document.querySelectorAll('.modal')
	M.Modal.init(modalElements)
}
function selectUnit() {
	const units = document.querySelectorAll('select')
	M.FormSelect.init(units)
}
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
				displayNutrients(data)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		})
	}
}

function displayNutrients(data) {
	const edamamInfo = document.getElementById('edamam-info') // TODO create on html
	edamamInfo.innerHTML = ''

	if (data) {
		/*
		payload = {
			name: res.data.ingredients.parsed.food,
			quantity: res.data.ingredients.parsed.quantity,
			calories: res.data.calories,
			protein: {
				quantity: res.data.totalNutrients.PROCNT.quantity,
				unit: res.data.totalNutrients.PROCNT.unit,
			},
			fat: {
				quantity: res.data.totalNutrients.FAT.quantity,
				unit: res.data.totalNutrients.FAT.unit,
			},
			carbohydrates: {
				quantity: res.data.totalNutrients.CHOCDF.quantity,
				unit: res.data.totalNutrients.CHOCDF.unit,
			},
		}
		*/

		let content = ''
		if (data.calories) {
			content += `Calories: ${data.calories}<br>`
		}
		if (data.totalNutrients.PROCNT) {
			content += `Protein: ${data.totalNutrients.PROCNT.quantity} ${data.totalNutrients.PROCNT.unit}<br>`
		}
		if (data.totalNutrients.FAT) {
			content += `Fat: ${data.totalNutrients.FAT.quantity} ${data.totalNutrients.FAT.unit}<br>`
		}
		if (data.totalNutrients.CHOCDF) {
			content += `Carbohydrates: ${data.totalNutrients.CHOCDF.quantity} ${data.totalNutrients.CHOCDF.unit}<br>`
		}
		if (data.servingSize) {
			content += `Serving Size: ${data.servingSize}<br>`
		} else if (data.quantity) {
			// Fallback to 'quantity' if 'servingSize' is not available
			content += `Quantity: ${data.quantity}<br>`
		}

		edamamInfo.innerHTML = content // Update the HTML content
	} else {
		edamamInfo.innerHTML = 'Nutrient information not available.'
	}
}

document.addEventListener('DOMContentLoaded', function () {
	initNavbar()
	selectUnit()
	foodSearchForm()
})
