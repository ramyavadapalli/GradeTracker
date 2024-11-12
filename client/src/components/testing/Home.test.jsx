import React from 'react';  // Import React explicitly
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Necessary for Link to work
import Home from '../Home'; // Adjust the path if needed

describe('Home Component', () => {
  // White-box testing: Utility to wrap the component in a Router for Link to work
  const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

  test('renders Navbar component', () => {
    renderWithRouter(<Home />); // Black-box testing: Rendering Home component with Router
    const navbar = screen.getByRole('navigation'); // Black-box testing: Finding Navbar by role
    expect(navbar).toBeInTheDocument();  // Black-box testing: Verifying the Navbar renders correctly
  });

  test('renders Footer component', () => {
    renderWithRouter(<Home />); // Black-box testing: Rendering Home component with Router
    const footer = screen.getByTestId('footer'); // Black-box testing: Finding Footer by test ID
    expect(footer).toBeInTheDocument();  // Black-box testing: Verifying the Footer renders correctly
  });

  test('renders background image', () => {
    renderWithRouter(<Home />); // Black-box testing: Rendering Home component with Router
    const backgroundImage = screen.getByAltText('Background'); // Black-box testing: Finding image by alt text
    expect(backgroundImage).toBeInTheDocument();  // Black-box testing: Verifying the background image is present
    expect(backgroundImage).toHaveAttribute('src', '/images/homepagePic.png'); // Black-box testing: Verifying image source
  });

  test('renders "Join Now" link with correct path', () => {
    renderWithRouter(<Home />); // Black-box testing: Rendering Home component with Router
    const joinNowLink = screen.getByText(/Join Now/i); // Black-box testing: Finding the "Join Now" link by text
    expect(joinNowLink).toBeInTheDocument();  // Black-box testing: Verifying the "Join Now" link is rendered
    expect(joinNowLink).toHaveAttribute('href', '/register'); // Black-box testing: Verifying the link's href attribute
  });

  test('renders main content with correct title and subtitle', () => {
    renderWithRouter(<Home />); // Black-box testing: Rendering Home component with Router
    const title = screen.getByText(/Track smarter, achieve higher/i); // Black-box testing: Finding title text
    const subtitle = screen.getByText(/Your all-in-one tool for monitoring grades/i); // Black-box testing: Finding subtitle text
    expect(title).toBeInTheDocument();  // Black-box testing: Verifying title renders correctly
    expect(subtitle).toBeInTheDocument(); // Black-box testing: Verifying subtitle renders correctly
  });
});
