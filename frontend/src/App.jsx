// frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Faculty from "./pages/Faculty";
import Classrooms from "./pages/Classrooms";
import GenerateTimetable from "./pages/GenerateTimetable";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/classrooms" element={<Classrooms />} />
            <Route path="/generate-timetable" element={<GenerateTimetable />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;