const express = require('express')
const router = express.Router()
const { createCourse, listCourses } = require('../controllers/courseController')

router.post('/', createCourse)
router.get('/', listCourses)

module.exports = router