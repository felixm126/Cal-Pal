// async function deleteFoodLogEntry(foodLogId) {
// 	try {
// 		const url = `http://localhost:3001/api/foodlogs/delete/${foodLogId}`
// 		// delete request to server
// 		const response = await fetch(url, {
// 			method: 'DELETE',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		})
// 		if (!response.ok) {
// 			throw new Error('Network response was not ok')
// 		}
// 		const result = await response.json()
// 		console.log('Food log entry deleted:', result)
// 	} catch (error) {
// 		console.error('Error deleting food log entry:', error)
// 	}
// }
// deleteFoodLogEntry(foodLogId)
