foodLogId = {}

async function searchLogByFoodName() {
	document
		.getElementById('search-food-form')
		.addEventListener('submit', async function (e) {
			e.preventDefault()
			const searchFood = document.getElementById('search-food-name').value
			console.log(searchFood)

			const url = `http://localhost:3001/api/foodlogs/logs?foodName=${encodeURIComponent(
				searchFood
			)}`
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
				if (data && data.length > 0) {
					const foodLogId = data[0]._id
					displayLog(foodLogId)
				}
			} catch (error) {
				console.error('Error searching food log:', error)
			}
		})
}

function displayLog(foodLogs) {
	const foodLogContainer = document.getElementById('food-log-container')
	foodLogContainer.innerHTML = ''

	if (foodLogs.length > 0) {
		foodLogs.forEach((log) => {
			const foodLogDiv = document.createElement('div')
			foodLogDiv.classList.add('food-log-entry')

			// show date for which the log was created
			const loggedFoodDate = new Date(log.createdAt).toLocaleDateString(
				'en-US',
				{
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				}
			)
			//append information to new div
			foodLogDiv.innerHTML = `
            <h4>Food: ${log.foodName}</h4>
            <p>Logged Date: ${loggedFoodDate}</p>
            <p>Calories: ${log.calories}</p>
            <p>Protein: ${log.protein}g</p>
            <p>Fat: ${log.fat}g</p>
            <p>Carbohydrates: ${log.carbohydrates}g</p>
            `
			foodLogContainer.appendChild(foodLogDiv)
		})
	} else {
		foodLogContainer.innerHTML = '<p>No Food logs found.</p>'
	}
}

async function updateFoodLogEntry(foodLogId, updatedData) {
	try {
		const response = await fetch(
			`http://localhost:3001/api/foodlogs/update/${foodLogId}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedData),
			}
		)

		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		const updatedFoodLog = await response.json()
		console.log('Updated food log:', updatedFoodLog)
	} catch (error) {
		console.error('Error updating food log:', error)
	}
	return updatedFoodLog
}

async function deleteFoodLogEntry(foodLogId) {
	try {
		const url = `http://localhost:3001/api/foodlogs/delete/${foodLogId}`
		const response = await fetch(url, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		if (!response.ok) {
			throw new Error('Network response was not ok')
		}
		const result = await response.json()
		console.log('Food log entry deleted:', result)
	} catch (error) {
		console.error('Error deleting food log entry:', error)
	}
}

// document.getElementById('updateButton').addEventListener('click', function () {
// 	displayLog(data)
// 	const foodLogId = data[0]._id
// 	updateFoodLogEntry(foodLogId)
// })

// document.getElementById('deleteButton').addEventListener('click', function () {
// 	displayLog(data)
// 	const foodLogId = data[0]._id
// 	deleteFoodLogEntry(foodLogId)
// })
