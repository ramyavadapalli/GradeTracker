import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GradeTrackr from '../GradeTrackr';

describe('GradeTrackr Component', () => {
  test('renders initial step 1 input for number of semesters', () => {
    render(<GradeTrackr />);

    const numSemestersInput = screen.getByLabelText(/How many semesters have you completed?/i);
    expect(numSemestersInput).toBeInTheDocument();
  });

  test('goes to step 2 when "Next" button is clicked', async () => {
    render(<GradeTrackr />);

    const numSemestersInput = screen.getByLabelText(/How many semesters have you completed?/i);
    fireEvent.change(numSemestersInput, { target: { value: '2' } }); // Assuming 2 semesters for testing

    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);

    // Wait for the second step to appear
    await waitFor(() => screen.getByText(/Enter hours and GPA for each semester/i));
    
    const semesterInput1 = await screen.findByLabelText(/Semester 1 GPA/i); // Use findByLabelText here
    const semesterInput2 = await screen.findByLabelText(/Semester 2 GPA/i);
    expect(semesterInput1).toBeInTheDocument();
    expect(semesterInput2).toBeInTheDocument();
  });

  test('calculates GPA correctly when "Calculate GPA" button is clicked', async () => {
    render(<GradeTrackr />);
  
    // Set the number of semesters
    const numSemestersInput = screen.getByLabelText(/How many semesters have you completed?/i);
    fireEvent.change(numSemestersInput, { target: { value: '2' } });
  
    // Go to the next step
    const nextButton = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextButton);
  
    // Wait for the semester input fields to appear
    await waitFor(() => screen.getByLabelText(/Semester 1 Hours/i));
    
    // Fill in the hours and GPA for each semester
    await userEvent.type(screen.getByLabelText(/Semester 1 GPA/i), '4.00');
    await userEvent.type(screen.getByLabelText(/Semester 1 Hours/i), '3');
    await userEvent.type(screen.getByLabelText(/Semester 2 GPA/i), '3.33');
    await userEvent.type(screen.getByLabelText(/Semester 2 Hours/i), '4');
  
    // Click on the "Calculate GPA" button
    await userEvent.click(screen.getByText(/Calculate GPA/i));
  
    // Wait for the result to appear
    await waitFor(() => screen.getByText(/Your Overall GPA:/i));
  
    // Check the displayed GPA result
    const gpaResult = await screen.findByText(/Your Overall GPA:\s?3.62/i); // Use the correct GPA value
    expect(gpaResult).toBeInTheDocument();
  });
});
