/// <reference types="vitest" />
import React from 'react';
import '@testing-library/jest-dom'; // Add this import at the top
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../Navbar'; // Adjust path if needed

describe('Navbar component', () => {
  
  // -------------------- Black-box Testing --------------------
  // Black-box testing focuses on the functionality of the component without any knowledge of its internal implementation.

  test('renders logo and brand name', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    // Check if logo is present
    const logo = screen.getByAltText(/GradeTrackr Logo/i);
    expect(logo).toBeInTheDocument();
    
    // Check if brand name link is present
    const brandLink = screen.getByText(/GradeTrackr/i);
    expect(brandLink).toBeInTheDocument();
  });

  test('renders Sign Up and Sign In links when showSignup is true', () => {
    render(
      <MemoryRouter>
        <Navbar showSignup={true} />
      </MemoryRouter>
    );
    
    // Check if Sign Up and Sign In buttons are present
    const signupButton = screen.getByText(/Sign Up/i);
    const signinButton = screen.getByText(/Sign In/i);

    expect(signupButton).toBeInTheDocument();
    expect(signinButton).toBeInTheDocument();
  });

  test('does not render Sign Up and Sign In links when showSignup is false', () => {
    render(
      <MemoryRouter>
        <Navbar showSignup={false} />
      </MemoryRouter>
    );

    // Check if Sign Up and Sign In buttons are not present
    const signupButton = screen.queryByText(/Sign Up/i);
    const signinButton = screen.queryByText(/Sign In/i);

    expect(signupButton).not.toBeInTheDocument();
    expect(signinButton).not.toBeInTheDocument();
  });

  // -------------------- White-box Testing --------------------
  // White-box testing focuses on the internal workings of the component. Since this is a simple component,
  // we would need to verify specific logic like rendering conditions, state changes, or internal functions.
  
  test('renders correct number of links based on showSignup prop', () => {
    const { rerender } = render(
      <MemoryRouter>
        <Navbar showSignup={true} />
      </MemoryRouter>
    );
    
    // Assert that with showSignup as true, we have 2 links (Sign Up, Sign In)
    let signupButton = screen.getByText(/Sign Up/i);
    let signinButton = screen.getByText(/Sign In/i);
    expect(signupButton).toBeInTheDocument();
    expect(signinButton).toBeInTheDocument();

    // Re-render Navbar with showSignup set to false
    rerender(
      <MemoryRouter>
        <Navbar showSignup={false} />
      </MemoryRouter>
    );

    // Assert that with showSignup as false, there are no links rendered
    signupButton = screen.queryByText(/Sign Up/i);
    signinButton = screen.queryByText(/Sign In/i);
    expect(signupButton).not.toBeInTheDocument();
    expect(signinButton).not.toBeInTheDocument();
  });
});
