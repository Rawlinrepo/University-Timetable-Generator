// frontend/src/components/TimetableCard.jsx
import React from "react";

const TimetableCard = ({ day, period, course, subject, faculty, classroom }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "8px", margin: "5px" }}>
      <strong>{day} - Period {period}</strong>
      <p>Course: {course}</p>
      <p>Subject: {subject}</p>
      <p>Faculty: {faculty}</p>
      <p>Classroom: {classroom}</p>
    </div>
  );
};

export default TimetableCard;
