// simple seeding script
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding...')

  // Admin
  await prisma.admin.upsert({
    where: { email: 'admin@uni.edu' },
    update: {},
    create: { name: 'Admin', email: 'admin@uni.edu' }
  })

  // Courses (Y2, Y3, Y4)
  const courseY2 = await prisma.course.upsert({
    where: { name: 'Y2' },
    update: {},
    create: { name: 'Y2', year: 2 }
  })
  const courseY3 = await prisma.course.upsert({
    where: { name: 'Y3' },
    update: {},
    create: { name: 'Y3', year: 3 }
  })
  const courseY4 = await prisma.course.upsert({
    where: { name: 'Y4' },
    update: {},
    create: { name: 'Y4', year: 4 }
  })

  // Faculties (14)
  const faculties = []
  for (let i = 1; i <= 14; i++) {
    const fac = await prisma.faculty.upsert({
      where: { name: `TR${i}` },
      update: {},
      create: { name: `TR${i}`, initials: `TR${i}` }
    })
    faculties.push(fac)
  }

  // Classrooms
  const rooms = []
  for (let i = 1; i <= 8; i++) {
    const room = await prisma.classroom.upsert({
      where: { name: `R${i}` },
      update: {},
      create: { name: `R${i}`, capacity: 60 }
    })
    rooms.push(room)
  }

  // Subjects (sample)
  const subjects = [
    // Y2
    { name: 'Data Structures', code: 'DS', type: 'THEORY', hoursPerWeek: 3, courseId: courseY2.id, facultyId: faculties[0].id },
    { name: 'DBMS', code: 'DBMS', type: 'THEORY', hoursPerWeek: 3, courseId: courseY2.id, facultyId: faculties[1].id },
    { name: 'DBMS Lab', code: 'DBMS-LAB', type: 'LAB', hoursPerWeek: 6, courseId: courseY2.id, facultyId: faculties[2].id }, // 3 sessions of 2h
    // Y3
    { name: 'Operating Systems', code: 'OS', type: 'THEORY', hoursPerWeek: 3, courseId: courseY3.id, facultyId: faculties[3].id },
    { name: 'Computer Networks', code: 'CN', type: 'THEORY', hoursPerWeek: 3, courseId: courseY3.id, facultyId: faculties[4].id },
    { name: 'Networks Lab', code: 'CN-LAB', type: 'LAB', hoursPerWeek: 6, courseId: courseY3.id, facultyId: faculties[5].id },
    // Y4
    { name: 'AI', code: 'AI', type: 'THEORY', hoursPerWeek: 3, courseId: courseY4.id, facultyId: faculties[6].id },
    { name: 'ML Lab', code: 'ML-LAB', type: 'LAB', hoursPerWeek: 6, courseId: courseY4.id, facultyId: faculties[7].id },
  ]

  for (const s of subjects) {
    await prisma.subject.upsert({
      where: { code: s.code },
      update: {},
      create: s
    })
  }

  // Timeslots: 5 days * 8 slots
  const days = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY']
  const times = [
    ['09:00','10:00'],
    ['10:00','11:00'],
    ['11:00','12:00'],
    ['13:00','14:00'],
    ['14:00','15:00'],
    ['15:00','16:00'],
    ['16:00','17:00'],
    ['17:00','18:00']
  ]

  for (const day of days) {
    for (let i = 0; i < times.length; i++) {
      await prisma.timeSlot.upsert({
        where: { id: (days.indexOf(day) * 8 + i + 1) },
        update: {},
        create: {
          day: day,
          slotIndex: i + 1,
          startTime: times[i][0],
          endTime: times[i][1]
        }
      })
    }
  }

  console.log('Seeding done.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
