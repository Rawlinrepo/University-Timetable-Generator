const express = require('express')
const router = express.Router()
const { generateTimetable, getTimetable, clearTimetable } = require('../controllers/timetableController')

router.post('/generate', generateTimetable)
router.get('/', getTimetable)
router.delete('/', clearTimetable)

module.exports = router