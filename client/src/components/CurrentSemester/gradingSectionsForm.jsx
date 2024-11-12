import React from "react";

const GradingSections = ({ sections, setSections }) => {
  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index] = { ...updatedSections[index], [field]: value };
    setSections(updatedSections);
  };

  const handleAddSection = () => {
    setSections([...sections, { name: "", weight: "" }]);
  };

  return (
    <div className="grading-sections">
      <h4>Grading Sections</h4>
      {sections.map((section, index) => (
        <div key={index} className="form-group">
          <input
            type="text"
            placeholder="Section name"
            value={section.name}
            onChange={(e) => handleSectionChange(index, "name", e.target.value)}
            className="form-control"
          />
          <input
            type="number"
            placeholder="Section weight (%)"
            value={section.weight}
            onChange={(e) =>
              handleSectionChange(index, "weight", e.target.value)
            }
            className="form-control"
            min="0"
          />
        </div>
      ))}
      <button onClick={handleAddSection} className="btn btn-link">
        + Add Section
      </button>
    </div>
  );
};

export default GradingSections;
