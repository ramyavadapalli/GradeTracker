import React from 'react';
import '@testing-library/jest-dom'; // Add this import at the top
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest'; // Import vi from vitest
import { BrowserRouter, useNavigate } from 'react-router-dom'; // Import useNavigate
import Login from '../Login'; // Adjust path as needed
import axios from 'axios';

// Mock axios (White Box Testing: We're mocking internal API calls)
vi.mock('axios');

// Mock react-router-dom and include useNavigate and Link
// White Box Testing: We're mocking navigation behavior using `useNavigate`
vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>, // Mock BrowserRouter for routing functionality
  useNavigate: vi.fn(), // Mock `useNavigate` with vi.fn()
  Link: ({ children, ...props }) => <a {...props}>{children}</a>, // Mock Link as a simple anchor tag
}));

describe('Login Component', () => {
  // Black Box Testing: Testing the form behavior from the user's perspective
  test('should render login form and handle input changes', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Simulate user typing into the email and password fields
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Check if the input fields reflect the changes
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  // Black Box Testing: Testing the behavior of login API and navigation from the user's perspective
  test('should call API and navigate on successful login', async () => {
    // Mocking a successful response from the login API (White Box Testing: Mock internal API behavior)
    axios.post.mockResolvedValueOnce({ data: { message: 'Success', userId: 123 } });

    const navigate = vi.fn(); // Create a mock function for useNavigate
    vi.mocked(useNavigate).mockReturnValue(navigate); // Mock useNavigate to return the mock function

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Simulate user entering valid credentials and submitting the form
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);

    // Wait for the API call and the navigation event
    // Black Box Testing: Verifying that the correct API URL is called with the right parameters
    await waitFor(() => expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/login', {
      email: 'test@example.com',
      password: 'password123',
    }));

    // Wait for the navigate function to be called (to check successful navigation)
    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/setup')); // Adjust timeout if necessary

    // Verifying that the userId is stored in localStorage (White Box Testing: Checking internal state manipulation)
    expect(localStorage.getItem('userId')).toBe('123');
  });

  // Black Box Testing: Testing the system's behavior with incorrect input
  test('should display error message on unsuccessful login', async () => {
    // Mocking an unsuccessful response from the login API (White Box Testing: Mock internal API behavior)
    axios.post.mockResolvedValueOnce({ data: 'Invalid credentials' });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Simulate user entering invalid credentials
    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(loginButton);

    // Black Box Testing: Check if the error message appears to the user
    await screen.findByText('Invalid credentials'); // Assuming alert shows this text
  });
});
