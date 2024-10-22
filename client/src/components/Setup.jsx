import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/setup.css";
import axios from "axios";

function Setup() {
  const [numSemesters, setNumSemesters] = useState("");
  const [semesterData, setSemesterData] = useState([]);
  const [step, setStep] = useState(1);
  const [overallGPA, setOverallGPA] = useState(null);
  const navigate = useNavigate();

  // Update state when semesters data changes
  const handleSemesterChange = (index, field, value) => {
    const updatedData = [...semesterData];
    updatedData[index] = { ...updatedData[index], [field]: parseFloat(value) };
    setSemesterData(updatedData);
  };

  // Calculate GPA
  const calculateGPA = () => {
    let totalQualityPoints = 0;
    let totalHours = 0;

    semesterData.forEach(({ hours, gpa }) => {
      totalQualityPoints += hours * gpa;
      totalHours += hours;
    });

    return totalHours > 0 ? (totalQualityPoints / totalHours).toFixed(2) : 0;
  };

  const handleFinishSetup = () => {
    const userId = localStorage.getItem("userId");

    const calculatedGPA = calculateGPA();
    setOverallGPA(calculatedGPA);

    const data = {
      userId,
      semesters: semesterData,
      overallGPA: calculatedGPA,
    };

    axios
      .post("http://localhost:3001/setup", data)
      .then((response) => {
        console.log(response.data);
        navigate("/dashboard");
      })
      .catch((error) => console.error("Error saving setup data: ", error));
  };

  // Render the component
  return (
    <div className="container">
      <h1 className="title">Welcome to GradeTrackr Setup</h1>

      {step === 1 && (
        <div className="inputSection">
          <label>How many semesters have you completed?</label>
          <input
            type="number"
            className="inputField"
            value={numSemesters}
            onChange={(e) => setNumSemesters(e.target.value)}
            min="1"
            required
          />
          <button
            onClick={() => {
              setSemesterData(
                Array.from({ length: numSemesters }, () => ({
                  hours: 0,
                  gpa: 0,
                }))
              );
              setStep(2);
            }}
            className="nextButton"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="inputSection">
          <h2>Enter hours and GPA for each semester</h2>
          {semesterData.map((_, index) => (
            <div key={index} className="semesterInput">
              <label>Semester {index + 1}</label>
              <input
                type="number"
                className="inputField"
                placeholder="Hours"
                min="0"
                onChange={(e) =>
                  handleSemesterChange(index, "hours", e.target.value)
                }
                required
              />
              <input
                type="number"
                className="inputField"
                step="0.01"
                placeholder="GPA"
                min="0"
                max="4.00"
                onChange={(e) =>
                  handleSemesterChange(index, "gpa", e.target.value)
                }
                required
              />
            </div>
          ))}
          <button onClick={handleFinishSetup} className="finishButton">
            Finish Setup
          </button>
        </div>
      )}

      {overallGPA !== null && (
        <div className="resultSection">
          <h2>Your Overall GPA: {overallGPA}</h2>
        </div>
      )}
    </div>
  );
}
export default Setup;
