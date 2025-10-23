/**
 * Simple greedy timetable generator.
 *
 * Expects:
 * - courses: array of courses (with subjects)
 * - classrooms: array
 * - timeslots: array of TimeSlot { id, day, slotIndex, ... } ordered by day and slotIndex
 * - prisma: Prisma client (used for lookups if needed)
 *
 * Output: array of TimetableEntry create payloads:
 * {
 *   courseId, subjectId, facultyId, classroomId, timeslotId
 * }
 *
 * Notes:
 * - LAB subjects must be scheduled as 2 consecutive slots.
 * - This is a greedy algorithm and does not backtrack.
 */

async function generate({ prisma, courses, faculties, classrooms, timeslots }) {
  // map timeslot availability: by timeslotId -> { usedByFaculty: Set, usedByRoom: Set, usedByCourse: Set }
  const timeslotMap = {}
  timeslots.forEach(ts => {
    timeslotMap[ts.id] = { ts, faculty: null, room: null, course: null }
  })

  // convenience helper: find timeslot by day & slotIndex
  const findTimeslotByDayIndex = (day, index) => timeslots.find(t => t.day === day && t.slotIndex === index)

  const entries = []

  const days = Array.from(new Set(timeslots.map(t => t.day))) // MONDAY..FRIDAY
  const slotsPerDay = Math.max(...timeslots.map(t => t.slotIndex))

  // For each course, schedule its subjects
  for (const course of courses) {
    for (const subject of course.subjects) {
      let hoursRemaining = subject.hoursPerWeek

      if (subject.type === 'LAB') {
        // schedule as 2-hour blocks => need hoursRemaining to be divisible by 2 ideally
        while (hoursRemaining >= 2) {
          let placed = false
          // iterate days and slotIndex such that slotIndex and slotIndex+1 exist
          for (const day of days) {
            for (let s = 1; s < slotsPerDay; s++) { // s and s+1
              const ts1 = findTimeslotByDayIndex(day, s)
              const ts2 = findTimeslotByDayIndex(day, s + 1)
              if (!ts1 || !ts2) continue

              if (isSlotFree(ts1, ts2, subject, course, classrooms, timeslotMap)) {
                // pick first available classroom
                const room = findAvailableClassroom(ts1, ts2, classrooms, timeslotMap)
                if (!room) continue

                // schedule both slots
                entries.push({
                  courseId: course.id,
                  subjectId: subject.id,
                  facultyId: subject.facultyId,
                  classroomId: room.id,
                  timeslotId: ts1.id
                })
                // to mark second slot, we create another TimetableEntry that points to ts2 (so both slots used)
                entries.push({
                  courseId: course.id,
                  subjectId: subject.id,
                  facultyId: subject.facultyId,
                  classroomId: room.id,
                  timeslotId: ts2.id
                })

                markSlotOccupied(ts1, ts2, subject, course, room, timeslotMap)
                hoursRemaining -= 2
                placed = true
                break
              }
            }
            if (placed) break
          }
          if (!placed) {
            console.warn(`Could not place lab subject ${subject.name} for course ${course.name}. Remaining hours: ${hoursRemaining}`)
            break
          }
        }

      } else {
        // THEORY: schedule 1-hour slots
        while (hoursRemaining > 0) {
          let placed = false
          for (const day of days) {
            for (let s = 1; s <= slotsPerDay; s++) {
              const ts = findTimeslotByDayIndex(day, s)
              if (!ts) continue

              if (isTheorySlotFree(ts, subject, course, timeslotMap)) {
                // pick classroom
                const room = findAvailableClassroom(ts, null, classrooms, timeslotMap)
                if (!room) continue

                entries.push({
                  courseId: course.id,
                  subjectId: subject.id,
                  facultyId: subject.facultyId,
                  classroomId: room.id,
                  timeslotId: ts.id
                })
                markTheorySlot(ts, subject, course, room, timeslotMap)
                hoursRemaining -= 1
                placed = true
                break
              }
            }
            if (placed) break
          }
          if (!placed) {
            console.warn(`Could not place theory subject ${subject.name} for course ${course.name}. Remaining hours: ${hoursRemaining}`)
            break
          }
        }
      }
    }
  }

  // return entries ready to be created in DB
  return entries
}

function isSlotFree(ts1, ts2, subject, course, classrooms, timeslotMap) {
  const state1 = timeslotMap[ts1.id]
  const state2 = timeslotMap[ts2.id]
  // faculty can't be occupied
  const facId = subject.facultyId
  if ((state1.faculty && state1.faculty === facId) || (state2.faculty && state2.faculty === facId)) return false
  // course can't have conflicts
  if ((state1.course && state1.course === course.id) || (state2.course && state2.course === course.id)) return false
  return true
}

function isTheorySlotFree(ts, subject, course, timeslotMap) {
  const s = timeslotMap[ts.id]
  if (!s) return false
  const facId = subject.facultyId
  if (s.faculty && s.faculty === facId) return false
  if (s.course && s.course === course.id) return false
  return !s.room // if room occupied it's taken
}

function findAvailableClassroom(ts1, ts2, classrooms, timeslotMap) {
  // pick first classroom not used in slot(s)
  for (const room of classrooms) {
    let conflict = false
    if (timeslotMap[ts1.id].room && timeslotMap[ts1.id].room === room.id) conflict = true
    if (ts2) {
      if (timeslotMap[ts2.id].room && timeslotMap[ts2.id].room === room.id) conflict = true
    }
    if (!conflict) return room
  }
  return null
}

function markSlotOccupied(ts1, ts2, subject, course, room, timeslotMap) {
  timeslotMap[ts1.id].faculty = subject.facultyId
  timeslotMap[ts2.id].faculty = subject.facultyId
  timeslotMap[ts1.id].room = room.id
  timeslotMap[ts2.id].room = room.id
  timeslotMap[ts1.id].course = course.id
  timeslotMap[ts2.id].course = course.id
}

function markTheorySlot(ts, subject, course, room, timeslotMap) {
  timeslotMap[ts.id].faculty = subject.facultyId
  timeslotMap[ts.id].room = room.id
  timeslotMap[ts.id].course = course.id
}

module.exports = { generate }