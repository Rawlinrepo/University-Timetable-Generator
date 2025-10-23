const express = require('express')
const router = express.Router()
const { getAdmin } = require('../controllers/adminController')

router.get('/', getAdmin)

module.exports = router
