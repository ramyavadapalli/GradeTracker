import React, { useState } from "react";
import "../../styles/gradingSections.css"; // Import custom styles

function GradingSections({ courseName }) {
  const [sections, setSections] = useState([{ name: "", weight: "" }]);
  const [isPercentage, setIsPercentage] = useState(true); // Toggle between percentage/points
  const [totalWeight, setTotalWeight] = useState(0);

  // Handle section name and weight changes
  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...sections];
    updatedSections[index] = { ...updatedSections[index], [field]: value };
    setSections(updatedSections);

    // Update total weight
    calculateTotalWeight(updatedSections);
  };

  // Calculate total weight
  const calculateTotalWeight = (sections) => {
    const total = sections.reduce(
      (sum, section) => sum + parseFloat(section.weight || 0),
      0
    );
    setTotalWeight(total);
  };

  // Add new section
  const handleAddSection = () => {
    setSections([...sections, { name: "", weight: "" }]);
  };

  // Toggle between percentage and points
  const handleToggle = () => {
    setIsPercentage(!isPercentage);
  };

  return (
    <div className="container" data-testid="grading-sections"> {/* Add data-testid here */}
      <h2>{courseName}</h2>
      <h3>Grading Sections Weights</h3>

      {/* Toggle between percentage and points */}
      <div className="toggle-switch">
        <label>
          <input type="radio" checked={isPercentage} onChange={handleToggle} />
          Percentage
        </label>
        <label>
          <input type="radio" checked={!isPercentage} onChange={handleToggle} />
          Points
        </label>
      </div>

      {/* Section input fields */}
      {sections.map((section, index) => (
        <div key={index} className="form-group">
          <input
            type="text"
            placeholder="Enter section name..."
            value={section.name}
            onChange={(e) => handleSectionChange(index, "name", e.target.value)}
            className="form-control"
          />
          <input
            type="number"
            placeholder={`Enter ${isPercentage ? "percentage" : "points"}...`}
            value={section.weight}
            onChange={(e) =>
              handleSectionChange(index, "weight", e.target.value)
            }
            className="form-control"
            min="0"
          />
          {isPercentage && <span>%</span>}
        </div>
      ))}

      {/* Add new section */}
      <button onClick={handleAddSection} className="btn btn-link">
        + add a section
      </button>

      {/* Total weight */}
      <div className="total-weight">
        <h4>
          Total Class Weight: {totalWeight} {isPercentage ? "%" : "points"}
        </h4>
      </div>

      {/* Submit button */}
      <button className="btn btn-primary">Submit</button>
    </div>
  );
}

export default GradingSections;
