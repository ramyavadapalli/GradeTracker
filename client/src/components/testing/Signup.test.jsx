// src/components/__test__/Signup.test.js
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
// White Box Testing: We're mocking navigation behavior using useNavigate
vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>, // Mock BrowserRouter for routing functionality
  useNavigate: vi.fn(), // Mock useNavigate with vi.fn()
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

  // Failing test case: Test that an email cannot be used more than once to sign up
  test('should not allow the same email to be used twice to sign-up', async () => {
    // Mocking an unsuccessful response from the signup API indicating that the email already exists
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

    // Simulate user input and submitting the form with an email that's already registered
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    // Wait for the error message to appear
    await waitFor(() => screen.getByText('Edge Case Failed: Same email was able to be used twice to sign-up'));

    // Assert that the error message is displayed indicating the failure to sign-up with a duplicate email
    expect(screen.getByText('Edge Case Failed: Same email was able to be used twice to sign-up')).toBeInTheDocument();
  });

  // Failing test case: Test that a user cannot sign up with a short password
  test('should not allow signup with a password that is too short', async () => {
    // Mocking an unsuccessful response from the signup API indicating that the password is too short
    axios.post.mockRejectedValueOnce({ response: { data: 'Password is too short' } });

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

    // Simulate user input with a short password and submit the form
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    fireEvent.change(emailInput, { target: { value: 'jane.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: '123' } }); // Password is too short
    fireEvent.click(submitButton);

    // Wait for the error message to appear
    await waitFor(() => screen.getByText('Edge Case Failed: Password is too short for signup'));

    // Assert that the error message is displayed indicating the failure due to short password
    expect(screen.getByText('Edge Case Failed: Password is too short for signup')).toBeInTheDocument();
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
});
