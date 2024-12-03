import React, { useState, useEffect } from "react";

const WhatIf = ({ courses }) => {
  const [hypotheticalGrades, setHypotheticalGrades] = useState([]);

  useEffect(() => {
    // Initialize hypotheticalGrades with existing course data
    setHypotheticalGrades(
      courses.map((course) => ({
        ...course,
        sections: course.sections.map((section) => ({
          ...section,
          assignments: section.assignments.map((assignment) => ({
            ...assignment,
            grade: assignment.grade || 0,
          })),
        })),
      }))
    );
  }, [courses]);

  const calculateHypotheticalGPA = () => {
    let totalWeight = 0;
    let weightedGrades = 0;

    hypotheticalGrades.forEach((course) => {
      course.sections.forEach((section) => {
        if (section.assignments.length > 0) {
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

  const handleGradeChange = (
    courseIndex,
    sectionIndex,
    assignmentIndex,
    value,
    field = "grade"
  ) => {
    const updatedGrades = [...hypotheticalGrades];
    updatedGrades[courseIndex].sections[sectionIndex].assignments[
      assignmentIndex
    ][field] = value;
    setHypotheticalGrades(updatedGrades);
  };

  const handleAddAssignment = (courseIndex, sectionIndex) => {
    const updatedGrades = [...hypotheticalGrades];
    updatedGrades[courseIndex].sections[sectionIndex].assignments.push({
      name: "New Assignment", // Placeholder name
      grade: 0,
    });
    setHypotheticalGrades(updatedGrades);
  };

  const hypotheticalGPA = calculateHypotheticalGPA();

  return (
    <div className="what-if-container">
      <h3>What If GPA Calculator</h3>
      <p>
        Use this tool to experiment with grades and see how they affect your
        semester GPA. These changes are not saved.
      </p>
      <div className="what-if-courses">
        {hypotheticalGrades.map((course, courseIndex) => (
          <div key={course._id} className="what-if-course">
            <h3>{course.name}</h3>
            {course.sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="what-if-section">
                <h5>
                  {section.name} ({section.weight}%)
                </h5>
                {section.assignments.map((assignment, assignmentIndex) => (
                  <div key={assignmentIndex} className="what-if-assignment">
                    <label>
                      <input
                        type="text"
                        value={assignment.name}
                        onChange={(e) =>
                          handleGradeChange(
                            courseIndex,
                            sectionIndex,
                            assignmentIndex,
                            e.target.value,
                            "name"
                          )
                        }
                        className="what-if-input"
                        placeholder="Assignment Name"
                      />
                      <input
                        type="number"
                        value={assignment.grade}
                        onChange={(e) =>
                          handleGradeChange(
                            courseIndex,
                            sectionIndex,
                            assignmentIndex,
                            e.target.value
                          )
                        }
                        min="0"
                        max="100"
                        className="what-if-input"
                        placeholder="Grade"
                      />
                    </label>
                  </div>
                ))}
                <button
                  onClick={() => handleAddAssignment(courseIndex, sectionIndex)}
                  className="btn btn-link"
                >
                  + Add Assignment
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
      <h4>Hypothetical Semester GPA: {hypotheticalGPA.toFixed(2)}</h4>
    </div>
  );
};

export default WhatIf;
