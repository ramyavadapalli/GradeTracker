import React from 'react';
import '@testing-library/jest-dom'; // Add this import at the top
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Setup from '../Setup';
import axios from 'axios';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'; // Explicitly import BrowserRouter

// Mock axios
vi.mock('axios');

// Mock react-router-dom properly
vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,  // Mock BrowserRouter
  useNavigate: vi.fn(), // Mock useNavigate as needed
}));

describe('Setup Component', () => {
  beforeEach(() => {
    axios.post.mockResolvedValue({ data: 'Success' });  // Mock the axios response
  });

  test('should render and allow user to input name, email, and password', async () => {
    render(
      <BrowserRouter>  {/* Use the real BrowserRouter here */}
        <Setup />
      </BrowserRouter>
    );

    // BLACK BOX: Step 1 - User inputs the number of semesters completed
    const numSemestersInput = screen.getByLabelText(/how many semesters have you completed\?/i);
    fireEvent.change(numSemestersInput, { target: { value: '3' } });

    // Simulate the user clicking the "Next" button to proceed to Step 2
    fireEvent.click(screen.getByText(/next/i));

    // WHITE BOX: Step 2 - Internal state management for each semester
    const semester1HoursInput = screen.getAllByPlaceholderText(/hours/i)[0]; // Target the first semester hours input
    fireEvent.change(semester1HoursInput, { target: { value: '15' } });

    const semester1GpaInput = screen.getAllByPlaceholderText(/gpa/i)[0]; // Target the first semester GPA input
    fireEvent.change(semester1GpaInput, { target: { value: '3.5' } });

    // BLACK BOX: Entering data for the second semester
    const semester2HoursInput = screen.getAllByPlaceholderText(/hours/i)[1]; // User fills semester 2 hours
    fireEvent.change(semester2HoursInput, { target: { value: '12' } });
    const semester2GpaInput = screen.getAllByPlaceholderText(/gpa/i)[1]; // User fills semester 2 GPA
    fireEvent.change(semester2GpaInput, { target: { value: '3.8' } });

    // WHITE BOX: Entering data for the third semester and ensuring correct handling in internal state
    const semester3HoursInput = screen.getAllByPlaceholderText(/hours/i)[2]; // User fills semester 3 hours
    fireEvent.change(semester3HoursInput, { target: { value: '18' } });
    const semester3GpaInput = screen.getAllByPlaceholderText(/gpa/i)[2]; // User fills semester 3 GPA
    fireEvent.change(semester3GpaInput, { target: { value: '3.7' } });

    // BLACK BOX: User clicks the "Finish Setup" button to complete the setup
    fireEvent.click(screen.getByText(/finish setup/i));

    // WHITE BOX: Waiting for the axios call and checking if the internal logic calls the right API endpoint
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);  // Ensure axios was called once
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/setup', expect.objectContaining({
        semesters: [
          { hours: 15, gpa: 3.5 },
          { hours: 12, gpa: 3.8 },
          { hours: 18, gpa: 3.7 },
        ],
        overallGPA: expect.any(String),
      }));
    });
  });
});
