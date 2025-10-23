const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const adminRoutes = require('./routes/adminRoutes')
const courseRoutes = require('./routes/courseRoutes')
const facultyRoutes = require('./routes/facultyRoutes')
const classroomRoutes = require('./routes/classroomRoutes')
const timetableRoutes = require('./routes/timetableRoutes')

const app = express()

app.use(cors({
  origin: 'http://16.171.69.197:5173', // allow frontend
  credentials: true
}));
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/admin', adminRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/faculty', facultyRoutes)
app.use('/api/classrooms', classroomRoutes)
app.use('/api/timetable', timetableRoutes)

app.get('/', (req, res) => res.send({ ok: true, msg: 'University Timetable Backend' }))

// error handler (simple)
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: err.message || 'Server error' })
})

module.exports = app
