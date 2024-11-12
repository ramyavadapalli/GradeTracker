import React from 'react';
import '@testing-library/jest-dom'; // Add this import at the top
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Setup from '../Setup';
import axios from 'axios';
import { BrowserRouter, useNavigate } from 'react-router-dom'; // Explicitly import BrowserRouter

// Mock axios
vi.mock('axios');

// Mock react-router-dom properly
vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,  // Mock BrowserRouter
  useNavigate: vi.fn(), // Mock useNavigate as needed,
}));

describe('Setup Component', () => {
  beforeEach(() => {
    axios.post.mockResolvedValue({ data: 'Success' });  // Mock the axios response
  });

  // -------------------- Black-box Testing --------------------
  // Black-box testing focuses on the functionality of the component without any knowledge of its internal implementation.

  test('should render and allow user to input number of semesters', async () => {
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

    // Verify step 2 is rendered
    await waitFor(() => {
      expect(screen.getByText(/enter hours and gpa for each semester/i)).toBeInTheDocument();
    });
  });

  test('should correctly render inputs for each semester after selecting number of semesters', async () => {
    render(
      <BrowserRouter>
        <Setup />
      </BrowserRouter>
    );

    // BLACK BOX: Step 1 - User inputs the number of semesters completed
    const numSemestersInput = screen.getByLabelText(/how many semesters have you completed\?/i);
    fireEvent.change(numSemestersInput, { target: { value: '2' } });
    fireEvent.click(screen.getByText(/next/i));

    // Verify inputs for each semester are rendered
    await waitFor(() => {
      const semester1HoursInput = screen.getAllByPlaceholderText(/hours/i)[0];
      const semester1GpaInput = screen.getAllByPlaceholderText(/gpa/i)[0];
      const semester2HoursInput = screen.getAllByPlaceholderText(/hours/i)[1];
      const semester2GpaInput = screen.getAllByPlaceholderText(/gpa/i)[1];

      expect(semester1HoursInput).toBeInTheDocument();
      expect(semester1GpaInput).toBeInTheDocument();
      expect(semester2HoursInput).toBeInTheDocument();
      expect(semester2GpaInput).toBeInTheDocument();
    });
  });

  // -------------------- White-box Testing --------------------
  // White-box testing focuses on the internal workings of the component, verifying specific logic like rendering conditions, state changes, or internal functions.

  test('should navigate to dashboard after successful setup', async () => {
    const navigate = vi.fn();
    vi.mocked(useNavigate).mockReturnValue(navigate);

    render(
      <BrowserRouter>
        <Setup />
      </BrowserRouter>
    );

    // WHITE BOX: Step 1 - User inputs the number of semesters completed
    const numSemestersInput = screen.getByLabelText(/how many semesters have you completed\?/i);
    fireEvent.change(numSemestersInput, { target: { value: '1' } });
    fireEvent.click(screen.getByText(/next/i));

    // Step 2 - User fills out semester details
    const semester1HoursInput = screen.getAllByPlaceholderText(/hours/i)[0];
    fireEvent.change(semester1HoursInput, { target: { value: '15' } });
    const semester1GpaInput = screen.getAllByPlaceholderText(/gpa/i)[0];
    fireEvent.change(semester1GpaInput, { target: { value: '3.5' } });

    // User clicks the "Finish Setup" button to complete the setup
    fireEvent.click(screen.getByText(/finish setup/i));

    // Verify that navigate was called to move to the dashboard
    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  test('should render title and input section on initial load', () => {
    render(
      <BrowserRouter>
        <Setup />
      </BrowserRouter>
    );

    // BLACK BOX: Verify the title and input section are rendered on initial load
    expect(screen.getByText(/welcome to gradetrackr setup/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/how many semesters have you completed\?/i)).toBeInTheDocument();
  });
});