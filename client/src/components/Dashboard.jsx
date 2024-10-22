// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css"; 
import Footer from "../components/Footer"; // Import Footer
import Navbar from "../components/Navbar"; // Import Navbar

// Register the chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/${userId}`)
      .then((response) => setUserData(response.data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [userId]);

  if (!userData) {
    return <div className="loading">Loading...</div>; // Add loading class
  }

  const { name, semesters, overallGPA } = userData;

  // Prepare chart data for GPA
  const gpaData = {
    labels: semesters.map((_, index) => `Semester ${index + 1}`),
    datasets: [
      {
        label: "GPA",
        data: semesters.map((semester) => semester.gpa),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div className="dashboard-container">
      {/* Navbar at the top */}
      <Navbar showSignup={false} showProfile={true} /> {/* Adjust props as needed */}

      {/* Greeting Section */}
      <h2 className="greeting">Hi, {name}!</h2>
      <div className="dashboard-row">
        {/* Left side - GPA Trend Chart */}
        <div className="dashboard-chart">
          <h2>Overall GPA Trend</h2>
          <div className="bar-chart">
            <Bar data={gpaData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Middle section - Recent Activity */}
        <div className="recent-activity">
          <h4>Recent Activity</h4>
          <p>No recent activity yet.</p> {/* Placeholder text */}
        </div>

        {/* Right side - Cumulative GPA Sidebar */}
        <div className="dashboard-sidebar">
          <h3>Cumulative GPA: {overallGPA}</h3>
          <ul>
            <li onClick={() => navigate("/gpa-goals")}>
              Set GPA Goals <span className="arrow">→</span>
            </li>
            <li onClick={() => navigate("/current-semester")}>
              Current Semester <span className="arrow">→</span>
            </li>
            <li onClick={() => navigate("/edit-semesters")}>
              Edit Previous Semesters <span className="arrow">→</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-spacing"></div>{" "}
      {/* Add whitespace above the footer */}
      <Footer />
    </div>
  );
}

export default Dashboard;
