import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseForm from "./CourseForm"; // Component for adding/editing a course
import "../../styles/currentSemester.css";

const CurrentSemester = () => {
  const [courses, setCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetch courses for the current semester
    axios
      .get(`http://localhost:3001/user/${userId}/courses`)
      .then((response) => {
        setCourses(response.data);
      });
  }, [userId]);

  const handleAddCourse = () => {
    setCurrentCourse(null); // Reset current course for a new entry
    setIsEditing(true);
  };

  const handleEditCourse = (course) => {
    setCurrentCourse(course);
    setIsEditing(true);
  };

  const handleSaveCourse = (newCourse) => {
    setCourses((prevCourses) =>
      currentCourse
        ? prevCourses.map((course) =>
            course._id === newCourse._id ? newCourse : course
          )
        : [...prevCourses, newCourse]
    );
    setIsEditing(false);
  };

  return (
    <div className="container">
      <h1>Current Semester Courses</h1>
      {isEditing ? (
        <CourseForm
          course={currentCourse}
          onSave={handleSaveCourse}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <button onClick={handleAddCourse} className="btn btn-primary">
            Add a Course
          </button>
          <div className="course-list">
            {courses.map((course) => (
              <div key={course._id} className="course-item">
                <h2>{course.name}</h2>
                <p>Hours: {course.hours}</p>
                <div className="grading-sections">
                  <h4>Grading Sections</h4>
                  {course.sections && course.sections.length > 0 ? (
                    course.sections.map((section, index) => (
                      <div key={index} className="section-item">
                        <p>
                          <strong>{section.name}</strong>: {section.weight}%
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No grading sections added</p>
                  )}
                </div>
                <button
                  onClick={() => handleEditCourse(course)}
                  className="btn btn-secondary"
                >
                  Edit Course
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CurrentSemester;
