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
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import TodoList from "../components/TodoList"; // Import TodoList

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
  const [gpaGoals, setGpaGoals] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }
    axios
      .get(`http://localhost:3001/user/${userId}`)
      .then((response) => {
        setUserData(response.data);
        if (!response.data.hasCompletedSetup) {
          navigate("/setup");
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));

    axios
      .get(`http://localhost:3001/user/${userId}/gpa-goals`)
      .then((response) => {
        setGpaGoals(response.data);
      })
      .catch((error) => console.error("Error fetching GPA goals:", error));
  }, [navigate]);

  if (!userData) {
    return <div className="loading">Loading...</div>;
  }

  const { name, semesters, overallGPA } = userData;

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
      <Navbar showSignup={false} showProfile={true} />
      <h2 className="greeting">Hi, {name}!</h2>
      <div className="dashboard-row">
        <div className="dashboard-chart">
          <h2>Overall GPA Trend</h2>
          <div className="bar-chart">
            <Bar data={gpaData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Replace Recent Activity with To-Do List */}
        <TodoList />

        <div className="dashboard-sidebar">
          <h3>Cumulative GPA: {overallGPA}</h3>
          <p>
            <strong>Semester Goal:</strong> {gpaGoals.semesterGoal || "Not set"}
          </p>
          <p>
            <strong>Cumulative Goal:</strong>{" "}
            {gpaGoals.cumulativeGoal || "Not set"}
          </p>
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
      <div className="footer-spacing"></div>
      <Footer />
    </div>
  );
}

export default Dashboard;
