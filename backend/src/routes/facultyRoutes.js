const express = require('express')
const router = express.Router()
const { createFaculty, listFaculty } = require('../controllers/facultyController')

router.post('/', createFaculty)
router.get('/', listFaculty)

module.exports = router