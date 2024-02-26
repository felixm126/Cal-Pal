async function addToFoodLog(foodLogData) {
	try {
		const response = await fetch('http://localhost:3001/api/foodlogs/create', {
			// Adjust the URL based on your routing
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(foodLogData),
		})
		if (!response.ok) {
			throw new Error('Failed to submit food log')
		}
		const result = await response.json()
		console.log(result)
		// Optionally redirect the user or display a success message
	} catch (error) {
		console.error('Error submitting food log:', error)
	}
}
