import React, { useEffect, useState } from 'react'
import API from '../services/api'

export default function Dashboard(){
  const [timetable, setTimetable] = useState([])

  useEffect(()=> { fetchTimetable() }, [])

  async function fetchTimetable(){
    const res = await API.get('/timetable')
    setTimetable(res.data)
  }

  return (
    <div>
      <div className="card" style={{marginBottom:12}}>
        <h3>Dashboard</h3>
        <p className="small">Admin only interface. Generate and view timetable.</p>
      </div>

      <div className="card">
        <h4>Generated Timetable Entries ({timetable.length})</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Day</th><th>Slot</th><th>Course</th><th>Subject</th><th>Faculty</th><th>Room</th>
            </tr>
          </thead>
          <tbody>
            {timetable.map(e => (
              <tr key={e.id}>
                <td>{e.timeslot.day}</td>
                <td>{e.timeslot.slotIndex} ({e.timeslot.startTime}-{e.timeslot.endTime})</td>
                <td>{e.course.name}</td>
                <td>{e.subject.name}</td>
                <td>{e.faculty.name}</td>
                <td>{e.classroom.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
