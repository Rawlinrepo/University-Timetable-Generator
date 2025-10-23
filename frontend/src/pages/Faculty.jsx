import React, { useState, useEffect } from 'react'
import API from '../services/api'

export default function Faculty(){
  const [list, setList] = useState([])
  const [name, setName] = useState('')
  const [initials, setInitials] = useState('')

  useEffect(()=> fetchList(), [])

  async function fetchList(){
    const res = await API.get('/faculties')
    setList(res.data)
  }

  async function add(){
    if(!name) return alert('name required')
    await API.post('/faculties', { name, initials })
    setName(''); setInitials('')
    fetchList()
  }

  return (
    <div>
      <div className="card" style={{marginBottom:12}}>
        <h3>Faculty</h3>
        <div style={{display:'flex', gap:8}}>
          <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <input placeholder="Initials" value={initials} onChange={e=>setInitials(e.target.value)} style={{width:120}} />
          <button className="btn" onClick={add}>Add</button>
        </div>
      </div>

      <div className="card">
        <h4>All Faculty</h4>
        <ul>
          {list.map(f => <li key={f.id}>{f.name} ({f.initials})</li>)}
        </ul>
      </div>
    </div>
  )
}