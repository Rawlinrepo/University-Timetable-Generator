import React, { useState, useEffect } from 'react'
import API from '../services/api'

export default function Courses(){
  const [courses, setCourses] = useState([])
  const [name, setName] = useState('')
  const [year, setYear] = useState(2)

  useEffect(()=> fetchCourses(), [])

  async function fetchCourses(){
    const res = await API.get('/courses')
    setCourses(res.data)
  }

  async function add(){
    if(!name) return alert('name required')
    await API.post('/courses', { name, year })
    setName('')
    fetchCourses()
  }

  return (
    <div>
      <div className="card" style={{marginBottom:12}}>
        <h3>Courses</h3>
        <div style={{display:'flex', gap:8}}>
          <input placeholder="Course name" value={name} onChange={e=>setName(e.target.value)} />
          <input type="number" value={year} onChange={e=>setYear(parseInt(e.target.value))} style={{width:80}} />
          <button className="btn" onClick={add}>Add</button>
        </div>
      </div>

      <div className="card">
        <h4>All courses</h4>
        <ul>
          {courses.map(c => <li key={c.id}>{c.name} - Year {c.year}</li>)}
        </ul>
      </div>
    </div>
  )
}