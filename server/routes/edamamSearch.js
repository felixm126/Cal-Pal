const express = require('express')
const router = express.Router()

const { edamamSearch } = require('../api/edamam')

router.get('/search', edamamSearch)

module.exports = router
