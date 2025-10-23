const prisma = require('../config/db')

async function createFaculty(req, res, next) {
  try {
    const { name, initials } = req.body
    const fac = await prisma.faculty.create({ data: { name, initials } })
    res.json(fac)
  } catch (err) {
    next(err)
  }
}

async function listFaculty(req, res, next) {
  try {
    const facs = await prisma.faculty.findMany()
    res.json(facs)
  } catch (err) {
    next(err)
  }
}

module.exports = { createFaculty, listFaculty }