const prisma = require('../config/db')
const generator = require('../services/timetableGenerator')

async function generateTimetable(req, res, next) {
  try {
    // Clear existing timetable
    await prisma.timetableEntry.deleteMany()

    // fetch DB state
    const courses = await prisma.course.findMany({ include: { subjects: { include: { faculty: true } } } })
    const faculties = await prisma.faculty.findMany()
    const classrooms = await prisma.classroom.findMany()
    const timeslots = await prisma.timeSlot.findMany({ orderBy: [{ day: 'asc' }, { slotIndex: 'asc' }] })

    const result = await generator.generate({
      prisma,
      courses,
      faculties,
      classrooms,
      timeslots
    })

    // save entries
    const createOps = result.map(e => prisma.timetableEntry.create({ data: e }))
    const saved = await Promise.all(createOps)

    res.json({ ok: true, created: saved.length })
  } catch (err) {
    next(err)
  }
}

async function getTimetable(req, res, next) {
  try {
    const entries = await prisma.timetableEntry.findMany({
      include: {
        course: true,
        subject: true,
        faculty: true,
        classroom: true,
        timeslot: true
      },
      orderBy: [
        { timeslot: { day: 'asc' } },
        { timeslot: { slotIndex: 'asc' } }
      ]
    })
    res.json(entries)
  } catch (err) {
    next(err)
  }
}

async function clearTimetable(req, res, next) {
  try {
    await prisma.timetableEntry.deleteMany()
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
}

module.exports = { generateTimetable, getTimetable, clearTimetable }