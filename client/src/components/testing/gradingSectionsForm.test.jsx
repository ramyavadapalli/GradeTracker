import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GradingSections from "../CurrentSemester/gradingSectionsForm";


describe('GradingSections Component', () => {
  test('renders the GradingSections component with course name', () => {
    render(<GradingSections courseName="Math 101" />);
    expect(screen.getByText('Math 101')).toBeInTheDocument();
  });

  test('toggles between percentage and points', () => {
    render(<GradingSections courseName="Math 101" />);
    
    // Initially, percentage should be selected
    const percentageRadio = screen.getByLabelText('Percentage');
    const pointsRadio = screen.getByLabelText('Points');
    
    expect(percentageRadio).toBeChecked();
    expect(pointsRadio).not.toBeChecked();

    // Toggle to points
    fireEvent.click(pointsRadio);
    expect(pointsRadio).toBeChecked();
    expect(percentageRadio).not.toBeChecked();

    // Toggle back to percentage
    fireEvent.click(percentageRadio);
    expect(percentageRadio).toBeChecked();
    expect(pointsRadio).not.toBeChecked();
  });

  test('adds a new section on clicking "+ add a section"', () => {
    render(<GradingSections courseName="Math 101" />);

    // Check for one section initially
    const initialSectionInput = screen.getAllByPlaceholderText('Enter section name...');
    expect(initialSectionInput).toHaveLength(1);

    // Click on add section button
    fireEvent.click(screen.getByText('+ add a section'));

    // There should now be two section inputs
    const updatedSectionInputs = screen.getAllByPlaceholderText('Enter section name...');
    expect(updatedSectionInputs).toHaveLength(2);
  });

  test('updates section name and weight on input change', () => {
    render(<GradingSections courseName="Math 101" />);

    // Enter section name and weight
    const nameInput = screen.getByPlaceholderText('Enter section name...');
    const weightInput = screen.getByPlaceholderText('Enter percentage...');

    fireEvent.change(nameInput, { target: { value: 'Homework' } });
    fireEvent.change(weightInput, { target: { value: '20' } });

    // Check if the inputs have the updated values
    expect(nameInput.value).toBe('Homework');
    expect(weightInput.value).toBe('20');
  });

  test('calculates total weight correctly for percentages', () => {
    render(<GradingSections courseName="Math 101" />);

    const weightInput = screen.getByPlaceholderText('Enter percentage...');
    
    // Enter weight for the section
    fireEvent.change(weightInput, { target: { value: '25' } });
    
    // Check if the total weight is updated correctly
    expect(screen.getByText('Total Class Weight: 25 %')).toBeInTheDocument();

    // Add another section and input its weight
    fireEvent.click(screen.getByText('+ add a section'));
    const newWeightInput = screen.getAllByPlaceholderText('Enter percentage...')[1];
    fireEvent.change(newWeightInput, { target: { value: '35' } });

    // Check if total weight is updated with both sections
    expect(screen.getByText('Total Class Weight: 60 %')).toBeInTheDocument();
  });

  test('displays points when toggled and calculates total points correctly', () => {
    render(<GradingSections courseName="Math 101" />);

    // Toggle to points
    const pointsRadio = screen.getByLabelText('Points');
    fireEvent.click(pointsRadio);

    // Enter points for the section
    const pointsInput = screen.getByPlaceholderText('Enter points...');
    fireEvent.change(pointsInput, { target: { value: '50' } });

    // Check if total weight is displayed in points
    expect(screen.getByText('Total Class Weight: 50 points')).toBeInTheDocument();
  });
});
