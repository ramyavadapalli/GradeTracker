import React from 'react';
import '@testing-library/jest-dom'; // For using Jest DOM matchers like toBeInTheDocument
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest'; // Importing vi for mocking functions
import { BrowserRouter, useNavigate } from 'react-router-dom'; // Importing routing functionality
import Signup from '../Signup'; // The component under test
import axios from 'axios'; // Importing axios for making API calls

// Mock axios (White Box Testing: Mocking internal API calls)
vi.mock('axios');

// Mock react-router-dom and include useNavigate and Link
// White Box Testing: We're mocking navigation behavior using `useNavigate`
vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>, // Mock BrowserRouter for routing functionality
  useNavigate: vi.fn(), // Mock `useNavigate` with vi.fn()
  Link: ({ children, ...props }) => <a {...props}>{children}</a>, // Mock Link as a simple anchor tag
}));

describe('Signup Component', () => {

  // Black Box Testing: Testing form behavior from the user's perspective
  test('should render signup form and handle input changes', () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    // Select the form fields by their label text
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Simulate user typing into the form fields (Black Box: we don't care about the internal handling, just the UI interaction)
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Assert that the form inputs are updated with the new values (Black Box: checking user expectations, no internal logic is being tested here)
    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  // Black Box Testing: Testing the behavior of the signup API and navigation from the user's perspective
  test('should call API and navigate to login on successful signup', async () => {
    // Mocking a successful response from the signup API (White Box Testing: Mock internal API behavior)
    axios.post.mockResolvedValueOnce({ data: { message: 'User created successfully' } });

    // Mocking the navigation behavior (White Box Testing: Mocking the useNavigate hook to track navigation)
    const navigate = vi.fn(); // Create a mock function for useNavigate
    vi.mocked(useNavigate).mockReturnValue(navigate); // Mock useNavigate to return the mock function

    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    // Select the form fields and submit button
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /register/i });

    // Simulate user input and submitting the form (Black Box: we are testing what happens from the user's perspective)
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Wait for the API call to be made and check if it was called with the correct data (White Box: checking internal API behavior)
    await waitFor(() => expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/signup', {
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    }));

    // Wait for the navigate function to be called, ensuring the user is redirected to the login page (White Box: testing internal navigation logic)
    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/login'));
  });

  // Black Box Testing: Testing the error handling when signup fails
  test('should display error message on unsuccessful signup', async () => {
    // Mocking an unsuccessful response from the signup API (White Box Testing: Mock internal API behavior)
    axios.post.mockRejectedValueOnce({ response: { data: 'Email already exists' } });

    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    // Select the form fields and submit button
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /register/i });

    // Simulate user input and form submission (Black Box: testing how the UI behaves when an error occurs)
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Wait for the error message to appear on the screen (Black Box: testing the error feedback from the UI)
    await waitFor(() => screen.getByText('Email already exists'));

    // Verify the error message is displayed (Black Box: ensuring that the user sees the expected error message on the UI)
    expect(screen.getByText('Email already exists')).toBeInTheDocument();
  });
});
