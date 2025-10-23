const express = require('express')
const router = express.Router()
const { createClassroom, listClassrooms } = require('../controllers/classroomController')

router.post('/', createClassroom)
router.get('/', listClassrooms)

module.exports = router