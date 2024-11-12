import React from "react";

const GradingSections = ({
  sections,
  setSections,
  onDeleteSection,
  onDeleteAssignment,
}) => {
  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index] = { ...updatedSections[index], [field]: value };
    setSections(updatedSections);
  };

  const handleAddSection = () => {
    setSections([...sections, { name: "", weight: "", assignments: [] }]);
  };

  const handleAddAssignment = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].assignments.push({ name: "", grade: "" });
    setSections(updatedSections);
  };

  const handleAssignmentChange = (
    sectionIndex,
    assignmentIndex,
    field,
    value
  ) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].assignments[assignmentIndex][field] = value;
    setSections(updatedSections);
  };

  return (
    <div className="grading-sections">
      <h4>Grading Sections</h4>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="form-group">
          <input
            type="text"
            placeholder="Section name"
            value={section.name}
            onChange={(e) =>
              handleSectionChange(sectionIndex, "name", e.target.value)
            }
            className="form-control"
          />
          <input
            type="number"
            placeholder="Section weight (%)"
            value={section.weight}
            onChange={(e) =>
              handleSectionChange(sectionIndex, "weight", e.target.value)
            }
            className="form-control"
            min="0"
          />
          <button
            onClick={() => onDeleteSection(sectionIndex)} // Correctly use onDeleteSection here
            className="btn btn-danger btn-sm"
          >
            Delete Section
          </button>

          <h5>Assignments</h5>
          {section.assignments.map((assignment, assignmentIndex) => (
            <div key={assignmentIndex} className="form-group">
              <input
                type="text"
                placeholder="Assignment name"
                value={assignment.name}
                onChange={(e) =>
                  handleAssignmentChange(
                    sectionIndex,
                    assignmentIndex,
                    "name",
                    e.target.value
                  )
                }
                className="form-control"
              />
              <input
                type="number"
                placeholder="Grade"
                value={assignment.grade}
                onChange={(e) =>
                  handleAssignmentChange(
                    sectionIndex,
                    assignmentIndex,
                    "grade",
                    e.target.value
                  )
                }
                className="form-control"
                min="0"
                max="100"
              />
              <button
                onClick={() =>
                  onDeleteAssignment(sectionIndex, assignmentIndex)
                } // Correctly use onDeleteAssignment here
                className="btn btn-danger btn-sm"
              >
                Delete Assignment
              </button>
            </div>
          ))}
          <button
            onClick={() => handleAddAssignment(sectionIndex)}
            className="btn btn-link"
          >
            + Add Assignment
          </button>
        </div>
      ))}
      <button onClick={handleAddSection} className="btn btn-link">
        + Add Section
      </button>
    </div>
  );
};

export default GradingSections;
