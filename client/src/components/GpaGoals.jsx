// src/components/GpaGoals.jsx
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar"; // Import Navbar
import Footer from "./Footer"; // Import Footer
import axios from "axios";
import "../styles/GpaGoals.css"; // Import CSS for styling

const GpaGoals = () => {
  const [semesterGoal, setSemesterGoal] = useState("");
  const [cumulativeGoal, setCumulativeGoal] = useState("");
  const [message, setMessage] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/${userId}/gpa-goals`)
      .then((response) => {
        setSemesterGoal(response.data.semesterGoal || "");
        setCumulativeGoal(response.data.cumulativeGoal || "");
      })
      .catch((error) => console.error("Error fetching GPA goals:", error));
  }, [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (semesterGoal && cumulativeGoal) {
      axios
        .post(`http://localhost:3001/user/${userId}/gpa-goals`, {
          semesterGoal,
          cumulativeGoal,
        })
        .then(() => {
          setMessage(
            `Your goals have been set! Semester Goal: ${semesterGoal}, Cumulative Goal: ${cumulativeGoal}`
          );
        })
        .catch((error) => console.error("Error setting GPA goals:", error));
    } else {
      setMessage("Please fill out both goals.");
    }
  };

  return (
    <div className="page-container">
      <Navbar />
      <main className="container">
        <h1 className="title">Set Your GPA Goals</h1>
        <form className="goal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="semesterGoal">Semester GPA Goal:</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4.0"
              id="semesterGoal"
              value={semesterGoal}
              onChange={(e) => setSemesterGoal(e.target.value)}
              placeholder="Enter semester GPA goal"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cumulativeGoal">Cumulative GPA Goal:</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4.0"
              id="cumulativeGoal"
              value={cumulativeGoal}
              onChange={(e) => setCumulativeGoal(e.target.value)}
              placeholder="Enter cumulative GPA goal"
            />
          </div>

          <button type="submit" className="submit-button">
            Set Goals
          </button>
        </form>

        {message && <p className="message">{message}</p>}
      </main>
      <Footer />
    </div>
  );
};

export default GpaGoals;
