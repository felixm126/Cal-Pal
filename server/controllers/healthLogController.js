const { HealthLog } = require('../models')

const getHealthLogs = async (req, res) => {
	try {
		const healthLogs = await HealthLog.find()
		res.json(healthLogs)
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const getHealthLogById = async (req, res) => {
	try {
		const healthLog = await HealthLog.findById(req.params.id)
		if (healthLog) {
			return res.json(healthLog)
		}
		return res
			.status(404)
			.send('Health log with the specified ID does not exist')
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const createHealthLog = async (req, res) => {
	try {
		const healthLog = new HealthLog(req.body)
		await healthLog.save()
		return res.status(201).json({ healthLog })
	} catch (error) {
		return res.status(500).json({ error: error.message })
	}
}

const updateHealthLog = async (req, res) => {
	try {
		const { id } = req.params
		const healthLog = await HealthLog.findByIdAndUpdate(id, req.body, {
			new: true,
		})
		if (healthLog) {
			return res.status(200).json(healthLog)
		}
		throw new Error('Health log not found')
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const deleteHealthLog = async (req, res) => {
	try {
		const { id } = req.params
		const deleted = await HealthLog.findByIdAndDelete(id)
		if (deleted) {
			return res.status(200).send('Health log deleted')
		}
		throw new Error('Health log not found')
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getHealthLogs,
	getHealthLogById,
	createHealthLog,
	updateHealthLog,
	deleteHealthLog,
}
