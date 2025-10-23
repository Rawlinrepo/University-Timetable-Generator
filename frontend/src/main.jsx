import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import Faculty from './pages/Faculty'
import Classrooms from './pages/Classrooms'
import GenerateTimetable from './pages/GenerateTimetable'
import './index.css'

function App(){
  return (
    <div className="container">
      <nav className="nav">
        <h2>Timetable Generator</h2>
        <div style={{marginLeft:'auto'}}>
          <Link to="/" style={{marginRight:10}}>Dashboard</Link>
          <Link to="/courses" style={{marginRight:10}}>Courses</Link>
          <Link to="/faculty" style={{marginRight:10}}>Faculty</Link>
          <Link to="/classrooms" style={{marginRight:10}}>Classrooms</Link>
          <Link to="/generate">Generate</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/courses" element={<Courses/>} />
        <Route path="/faculty" element={<Faculty/>} />
        <Route path="/classrooms" element={<Classrooms/>} />
        <Route path="/generate" element={<GenerateTimetable/>} />
      </Routes>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
)
