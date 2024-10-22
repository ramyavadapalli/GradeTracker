// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./Footer"; // Import the Footer component
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

// Register the chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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
    return <div>Loading...</div>;
  }

  const { semesters, overallGPA } = userData;

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
      <div className="content">
        <div className="row">
          {/* Left side - GPA Trend Chart */}
          <div className="col-md-8">
            <h2>Overall GPA Trend</h2>
            <Bar data={gpaData} />
          </div>

          {/* Right side - Recent Activity and Sidebar */}
          <div className="col-md-4">
            <div className="sidebar">
              <h3>Cumulative GPA: {overallGPA}</h3>
              <ul>
                <li onClick={() => navigate("/gpa-goals")}>Set GPA Goals</li>
                <li onClick={() => navigate("/current-semester")}>
                  Current Semester
                </li>
                <li onClick={() => navigate("/edit-semesters")}>
                  Edit Previous Semesters
                </li>
              </ul>
            </div>

            <div className="recent-activity">
              <h4>Recent Activity</h4>
              {/* Future implementation for recent activity */}
            </div>
          </div>
        </div>
      </div>

      <Footer /> {/* Footer at the bottom */}
    </div>
  );
}

export default Dashboard;
