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
		// Handle the updated food log as needed
	} catch (error) {
		console.error('Error updating food log:', error)
	}
}
updateFoodLogEntry(foodLogId, updatedData)
