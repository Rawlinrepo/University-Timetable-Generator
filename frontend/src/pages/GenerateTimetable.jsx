import React, { useState } from 'react'
import API from '../services/api'

export default function GenerateTimetable(){
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  async function generate(){
    setLoading(true)
    setMsg('')
    try {
      const res = await API.post('/timetable/generate')
      setMsg(`Created ${res.data.created} entries`)
    } catch (err) {
      console.error(err)
      setMsg('Error generating timetable')
    } finally {
      setLoading(false)
    }
  }

  async function clearIt(){
    setLoading(true)
    try {
      await API.delete('/timetable')
      setMsg('Cleared timetable')
    } catch (err) {
      setMsg('Error clearing')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="card" style={{marginBottom:12}}>
        <h3>Generate Timetable</h3>
        <p className="small">Click generate to run the algorithm. Use seed data initially.</p>
        <div style={{display:'flex', gap:8}}>
          <button className="btn" onClick={generate} disabled={loading}>{loading ? 'Working...' : 'Generate'}</button>
          <button className="btn" style={{background:'#ef4444'}} onClick={clearIt} disabled={loading}>Clear</button>
        </div>
        {msg && <p style={{marginTop:8}}>{msg}</p>}
      </div>
    </div>
  )
}