import React, { useState } from "react";
import "../../styles/currentSemester.css"; // Import your custom styles
import GradingSections from "./gradingSectionsForm";

function CurrentSemester() {
  const [step, setStep] = useState(1); // Manage the current step
  const [numCourses, setNumCourses] = useState(""); // Number of courses
  const [courses, setCourses] = useState([]); // Course data (names and hours)
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);

  // Handle changes for number of courses
  const handleNumCoursesChange = (e) => {
    setNumCourses(e.target.value);
  };

  // Handle changes for course details (name, credit hours)
  const handleCourseChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index] = { ...updatedCourses[index], [field]: value };
    setCourses(updatedCourses);
  };

  const handleNextStep = () => {
    if (step === 1 && numCourses > 0) {
      setCourses(
        Array.from({ length: numCourses }, () => ({ name: "", hours: "" }))
      );
      setStep(2);
    } else if (step === 2 && currentCourseIndex < courses.length - 1) {
      setCurrentCourseIndex(currentCourseIndex + 1);
      setStep(3); // Move to grading sections
    }
  };

  // Go back to the previous step
  const handlePreviousStep = () => {
    if (step === 3) {
      setCurrentCourseIndex(currentCourseIndex - 1);
    } else {
      setStep(step - 1);
    }
  };

  return (
    <div className="container">
      <h2>Vanderbilt University</h2>
      {step === 1 && (
        <div className="form-group">
          <h3>Let’s start tracking your current semester.</h3>
          <label>Courses</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter # of courses..."
            value={numCourses}
            onChange={handleNumCoursesChange}
            min="1"
          />
          <button onClick={handleNextStep} className="btn btn-primary mt-3">
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3>Enter your course details</h3>
          {courses.map((course, index) => (
            <div key={index} className="form-group">
              <label>Course {index + 1}</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter course name..."
                value={course.name}
                onChange={(e) =>
                  handleCourseChange(index, "name", e.target.value)
                }
              />
              <input
                type="number"
                className="form-control"
                placeholder="Enter # of hours..."
                value={course.hours}
                onChange={(e) =>
                  handleCourseChange(index, "hours", e.target.value)
                }
                min="1"
              />
            </div>
          ))}
          <button
            onClick={handlePreviousStep}
            className="btn btn-secondary mt-3"
          >
            Back
          </button>
          <button onClick={handleNextStep} className="btn btn-primary mt-3">
            Next
          </button>
        </div>
      )}
      {step === 3 && (
        <GradingSections
          courseName={courses[currentCourseIndex].name}
          onPrevious={handlePreviousStep}
          onNext={handleNextStep}
        />
      )}
    </div>
  );
}

export default CurrentSemester;
