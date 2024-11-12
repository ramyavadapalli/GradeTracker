import React, { useState, useEffect } from "react";
import axios from "axios";
import GradingSections from "./gradingSectionsForm"; // Component to add grading sections

const CourseForm = ({ course, onSave, onCancel }) => {
  const [name, setName] = useState(course ? course.name : "");
  const [hours, setHours] = useState(course ? course.hours : "");
  const [sections, setSections] = useState(course ? course.sections : []);
  const userId = localStorage.getItem("userId");

  const handleSave = () => {
    const courseData = { name, hours, sections };
    const request = course
      ? axios.put(
          `http://localhost:3001/user/${userId}/courses/${course._id}`,
          courseData
        )
      : axios.post(`http://localhost:3001/user/${userId}/courses`, courseData);

    request.then((response) => {
      onSave(response.data);
    });
  };

  // Delete a specific section
  const handleDeleteSection = (sectionIndex) => {
    const updatedSections = sections.filter(
      (_, index) => index !== sectionIndex
    );
    setSections(updatedSections);
  };

  // Delete a specific assignment within a section
  const handleDeleteAssignment = (sectionIndex, assignmentIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].assignments = updatedSections[
      sectionIndex
    ].assignments.filter((_, index) => index !== assignmentIndex);
    setSections(updatedSections);
  };

  return (
    <div className="course-form">
      <h3>{course ? "Edit Course" : "Add a Course"}</h3>
      <div className="form-group">
        <label>Course Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Course Hours:</label>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="form-control"
          min="1"
        />
      </div>
      <GradingSections
        sections={sections}
        setSections={setSections}
        onDeleteSection={handleDeleteSection}
        onDeleteAssignment={handleDeleteAssignment}
      />

      <button onClick={handleSave} className="btn btn-primary">
        Save Course
      </button>
      <button onClick={onCancel} className="btn btn-secondary">
        Cancel
      </button>
    </div>
  );
};

export default CourseForm;
