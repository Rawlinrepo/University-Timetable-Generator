// frontend/src/components/Sidebar.jsx
import React from "react";

const Sidebar = () => {
  return (
    <aside style={{ width: "200px", background: "#f4f4f4", padding: "10px" }}>
      <ul>
        <li>Dashboard</li>
        <li>Courses</li>
        <li>Faculty</li>
        <li>Classrooms</li>
        <li>Generate Timetable</li>
      </ul>
    </aside>
  );
};

export default Sidebar;