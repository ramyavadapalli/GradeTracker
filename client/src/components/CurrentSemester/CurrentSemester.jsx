import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseForm from "./CourseForm";
import "../../styles/currentSemester.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

const CurrentSemester = () => {
  const [courses, setCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [GPA, setGPA] = useState(0);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/user/${userId}/courses`)
      .then((response) => setCourses(response.data))
      .catch((error) => console.error("Error fetching courses:", error));
  }, [userId]);

  const calculateGPA = () => {
    let totalWeight = 0;
    let weightedGrades = 0;
    courses.forEach((course) => {
      course.sections.forEach((section) => {
        if (section.assignments && section.assignments.length > 0) {
          const sectionGrade =
            section.assignments.reduce(
              (sum, assignment) => sum + parseFloat(assignment.grade || 0),
              0
            ) / section.assignments.length;
          weightedGrades += (sectionGrade * section.weight) / 100;
          totalWeight += section.weight;
        }
      });
    });
    return totalWeight > 0 ? (weightedGrades / totalWeight) * 4 : 0;
  };

  useEffect(() => {
    setGPA(calculateGPA());
  }, [courses]);

  const handleAddCourse = () => {
    setCurrentCourse(null);
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
    <>
      <Navbar />
      <div className="current-semester-container">
        <div className="content-wrapper">
          <h1 className="page-title">Current Semester Courses</h1>
          <h3 className="gpa">Current Semester GPA: {GPA.toFixed(2)}</h3>
          {isEditing ? (
            <CourseForm
              course={currentCourse}
              onSave={handleSaveCourse}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <>
              <button onClick={handleAddCourse} className="add-course-button">
                Add a Course
              </button>
              <div className="course-list">
                {courses.map((course) => (
                  <div key={course._id} className="course-item">
                    <div className="course-header">
                      <h2>{course.name}</h2>
                      <button
                        onClick={() => handleDeleteCourse(course._id)}
                        className="delete-button"
                      >
                        Delete Course
                      </button>
                    </div>
                    <p className="course-hours">Hours: {course.hours}</p>
                    <div className="grading-sections">
                      <h4>Grading Sections</h4>
                      {course.sections.length > 0 ? (
                        course.sections.map((section, sectionIndex) => (
                          <div key={sectionIndex} className="section-item">
                            <p>
                              <strong>{section.name}</strong>: {section.weight}%
                            </p>
                            <h5>Assignments</h5>
                            {section.assignments.length > 0 ? (
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
                      className="edit-button"
                    >
                      Edit Course
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CurrentSemester;
