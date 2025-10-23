import React, { useState, useEffect } from 'react'
import API from '../services/api'

export default function Classrooms(){
  const [rooms, setRooms] = useState([])
  const [name, setName] = useState('')
  const [cap, setCap] = useState(60)

  useEffect(()=> fetchRooms(), [])

  async function fetchRooms(){
    const res = await API.get('/classrooms')
    setRooms(res.data)
  }

  async function add(){
    if(!name) return alert('name required')
    await API.post('/classrooms', { name, capacity: cap })
    setName(''); setCap(60)
    fetchRooms()
  }

  return (
    <div>
      <div className="card" style={{marginBottom:12}}>
        <h3>Classrooms</h3>
        <div style={{display:'flex', gap:8}}>
          <input placeholder="Room name" value={name} onChange={e=>setName(e.target.value)} />
          <input type="number" value={cap} onChange={e=>setCap(parseInt(e.target.value))} style={{width:120}} />
          <button className="btn" onClick={add}>Add</button>
        </div>
      </div>

      <div className="card">
        <h4>All Rooms</h4>
        <ul>
          {rooms.map(r => <li key={r.id}>{r.name} - cap {r.capacity}</li>)}
        </ul>
      </div>
    </div>
  )
}