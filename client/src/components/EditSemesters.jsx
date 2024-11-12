import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/EditSemesters.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const apiUrl = import.meta.env.VITE_API_URL;
function EditSemesters() {
  const [semesters, setSemesters] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${apiUrl}/user/${userId}`)
      .then((response) => {
        setSemesters(response.data.semesters);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [userId]);

  const handleSemesterChange = (index, field, value) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[index] = {
      ...updatedSemesters[index],
      [field]: parseFloat(value),
    };
    setSemesters(updatedSemesters);
  };

  const handleAddSemester = () => {
    setSemesters([...semesters, { hours: 0, gpa: 0 }]);
  };

  const handleDeleteSemester = (index) => {
    const updatedSemesters = semesters.filter((_, i) => i !== index);
    setSemesters(updatedSemesters);
  };

  const calculateOverallGPA = () => {
    let totalQualityPoints = 0;
    let totalHours = 0;

    semesters.forEach(({ hours, gpa }) => {
      if (hours > 0 && gpa > 0) {
        totalQualityPoints += hours * gpa;
        totalHours += hours;
      }
    });

    return totalHours > 0 ? (totalQualityPoints / totalHours).toFixed(2) : 0;
  };

  const handleSaveChanges = () => {
    const calculatedGPA = calculateOverallGPA();
    const data = {
      userId,
      semesters,
      overallGPA: calculatedGPA,
    };

    axios
      .post(`${apiUrl}/setup`, data)
      .then((response) => {
        console.log(response.data);
        navigate("/dashboard");
      })
      .catch((error) => console.error("Error saving semester data: ", error));
  };

  return (
    <>
      <Navbar /> {/* Navbar outside main content */}
      <div className="edit-semesters-container">
        <div className="form-container">
          {" "}
          {/* Add this wrapper */}
          <h2>Edit Your Semesters</h2>
          {semesters.length === 0 ? (
            <p>No semesters found. Please add some semesters to edit.</p>
          ) : (
            <form>
              {semesters.map((semester, index) => (
                <div key={index} className="semester-input">
                  <label>Semester {index + 1}</label>
                  <input
                    type="number"
                    placeholder="Hours"
                    value={semester.hours || ""}
                    min="0"
                    onChange={(e) =>
                      handleSemesterChange(index, "hours", e.target.value)
                    }
                    required
                  />
                  <input
                    type="number"
                    placeholder="GPA"
                    value={semester.gpa || ""}
                    min="0"
                    max="4.00"
                    step="0.01"
                    onChange={(e) =>
                      handleSemesterChange(index, "gpa", e.target.value)
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteSemester(index)}
                    className="delete-button"
                  >
                    Delete Semester
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddSemester}
                className="add-button"
              >
                Add Semester
              </button>
              <button
                type="button"
                onClick={handleSaveChanges}
                className="save-button"
              >
                Save Changes
              </button>
            </form>
          )}
        </div>{" "}
        {/* Close wrapper */}
      </div>
      <Footer /> {/* Footer outside main content */}
    </>
  );
}

export default EditSemesters;
