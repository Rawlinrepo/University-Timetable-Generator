const prisma = require('../config/db')

async function createCourse(req, res, next) {
  try {
    const { name, year } = req.body
    const course = await prisma.course.create({
      data: { name, year }
    })
    res.json(course)
  } catch (err) {
    next(err)
  }
}

async function listCourses(req, res, next) {
  try {
    const courses = await prisma.course.findMany({ include: { subjects: true }})
    res.json(courses)
  } catch (err) {
    next(err)
  }
}

module.exports = { createCourse, listCourses }