import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GradingSections from "../CurrentSemester/gradingSectionsForm";


describe('GradingSections Component', () => {
  
  // Black-box testing: Testing the rendering and display of course name.
  test('renders the GradingSections component with course name', () => {
    render(<GradingSections courseName="Math 101" />);
    expect(screen.getByText('Math 101')).toBeInTheDocument();
  });

  // Black-box testing: Testing user interaction (toggle) and expected behavior without knowing internal code.
  test('toggles between percentage and points', () => {
    render(<GradingSections courseName="Math 101" />);
    
    const percentageRadio = screen.getByLabelText('Percentage');
    const pointsRadio = screen.getByLabelText('Points');
    
    expect(percentageRadio).toBeChecked(); // Initially percentage should be checked
    expect(pointsRadio).not.toBeChecked();

    fireEvent.click(pointsRadio); // Toggle to points
    expect(pointsRadio).toBeChecked();
    expect(percentageRadio).not.toBeChecked();

    fireEvent.click(percentageRadio); // Toggle back to percentage
    expect(percentageRadio).toBeChecked();
    expect(pointsRadio).not.toBeChecked();
  });

  // Black-box testing: Testing user interaction (click) and its effect on the UI (section addition).
  test('adds a new section on clicking "+ add a section"', () => {
    render(<GradingSections courseName="Math 101" />);

    const initialSectionInput = screen.getAllByPlaceholderText('Enter section name...');
    expect(initialSectionInput).toHaveLength(1); // Initially one section input

    fireEvent.click(screen.getByText('+ add a section')); // User clicks "Add a section" button

    const updatedSectionInputs = screen.getAllByPlaceholderText('Enter section name...');
    expect(updatedSectionInputs).toHaveLength(2); // After click, two section inputs
  });

  // Black-box testing: Testing the form input functionality from a user's perspective, without concern for internal code.
  test('updates section name and weight on input change', () => {
    render(<GradingSections courseName="Math 101" />);

    const nameInput = screen.getByPlaceholderText('Enter section name...');
    const weightInput = screen.getByPlaceholderText('Enter percentage...');

    fireEvent.change(nameInput, { target: { value: 'Homework' } });
    fireEvent.change(weightInput, { target: { value: '20' } });

    expect(nameInput.value).toBe('Homework'); // Verifying user input
    expect(weightInput.value).toBe('20');
  });

  // Black-box testing: Testing the output displayed to the user when interacting with the form, without knowing the underlying logic.
  test('calculates total weight correctly for percentages', () => {
    render(<GradingSections courseName="Math 101" />);

    const weightInput = screen.getByPlaceholderText('Enter percentage...');
    
    fireEvent.change(weightInput, { target: { value: '25' } });
    expect(screen.getByText('Total Class Weight: 25 %')).toBeInTheDocument();

    fireEvent.click(screen.getByText('+ add a section')); // Add another section
    const newWeightInput = screen.getAllByPlaceholderText('Enter percentage...')[1];
    fireEvent.change(newWeightInput, { target: { value: '35' } });

    expect(screen.getByText('Total Class Weight: 60 %')).toBeInTheDocument(); // Verifying the updated total weight
  });

  // Black-box testing: Ensuring that when toggling to points, the total weight is displayed correctly.
  test('displays points when toggled and calculates total points correctly', () => {
    render(<GradingSections courseName="Math 101" />);

    const pointsRadio = screen.getByLabelText('Points');
    fireEvent.click(pointsRadio); // Toggle to points

    const pointsInput = screen.getByPlaceholderText('Enter points...');
    fireEvent.change(pointsInput, { target: { value: '50' } });

    expect(screen.getByText('Total Class Weight: 50 points')).toBeInTheDocument(); // Verifying total points
  });
});
