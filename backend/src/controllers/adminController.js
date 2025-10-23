const prisma = require('../config/db')

async function getAdmin(req, res, next) {
  try {
    const admin = await prisma.admin.findFirst()
    res.json(admin)
  } catch (err) {
    next(err)
  }
}

module.exports = { getAdmin }
