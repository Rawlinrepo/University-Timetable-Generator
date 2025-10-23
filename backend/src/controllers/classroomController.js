const prisma = require('../config/db')

async function createClassroom(req, res, next) {
  try {
    const { name, capacity } = req.body
    const room = await prisma.classroom.create({ data: { name, capacity } })
    res.json(room)
  } catch (err) {
    next(err)
  }
}

async function listClassrooms(req, res, next) {
  try {
    const rooms = await prisma.classroom.findMany()
    res.json(rooms)
  } catch (err) {
    next(err)
  }
}

module.exports = { createClassroom, listClassrooms }