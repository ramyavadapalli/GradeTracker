import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseForm from "./CourseForm"; // Component for adding/editing a course
import "../../styles/currentSemester.css";

const CurrentSemester = () => {
  const [courses, setCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [GPA, setGPA] = useState(0);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetch courses for the current semester
    axios
      .get(`http://localhost:3001/user/${userId}/courses`)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, [userId]);

  // Calculate GPA based on course data
  const calculateGPA = () => {
    let totalWeight = 0;
    let weightedGrades = 0;

    courses.forEach((course) => {
      course.sections.forEach((section) => {
        if (section.assignments && section.assignments.length > 0) {
          // Calculate average grade for this section
          const sectionGrade =
            section.assignments.reduce(
              (sum, a) => sum + parseFloat(a.grade || 0),
              0
            ) / section.assignments.length;
          // Weighted grade calculation
          weightedGrades += (sectionGrade * section.weight) / 100;
          totalWeight += section.weight;
        }
      });
    });

    return totalWeight > 0 ? (weightedGrades / totalWeight) * 4 : 0; // GPA scale of 4.0
  };

  // Recalculate GPA whenever courses change
  useEffect(() => {
    setGPA(calculateGPA());
  }, [courses]);

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

  const handleDeleteCourse = (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      axios
        .delete(`http://localhost:3001/user/${userId}/courses/${courseId}`)
        .then(() => {
          setCourses((prevCourses) =>
            prevCourses.filter((course) => course._id !== courseId)
          );
        })
        .catch((error) => console.error("Error deleting course:", error));
    }
  };

  return (
    <div className="container">
      <h1>Current Semester Courses</h1>
      <h3>Current Semester GPA: {GPA.toFixed(2)}</h3>
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
                    course.sections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="section-item">
                        <p>
                          <strong>{section.name}</strong>: {section.weight}%
                        </p>
                        <h5>Assignments</h5>
                        {section.assignments &&
                        section.assignments.length > 0 ? (
                          section.assignments.map(
                            (assignment, assignmentIndex) => (
                              <div
                                key={assignmentIndex}
                                className="assignment-item"
                              >
                                <p>
                                  {assignment.name}: {assignment.grade}%
                                </p>
                              </div>
                            )
                          )
                        ) : (
                          <p>No assignments added</p>
                        )}
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
                <button
                  onClick={() => handleDeleteCourse(course._id)}
                  className="btn btn-danger"
                >
                  Delete Course
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
