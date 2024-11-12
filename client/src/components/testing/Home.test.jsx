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

  // Additional Tests for Better Coverage

  test('renders Navbar with correct links', () => {
    renderWithRouter(<Home />); // Black-box testing: Rendering Home component with Router
    const signupLink = screen.getByText(/Sign-up/i); // Black-box testing: Finding "Sign-up" link by text
    expect(signupLink).toBeInTheDocument();  // Black-box testing: Verifying "Sign-up" link is rendered
    expect(signupLink).toHaveAttribute('href', '/register'); // Black-box testing: Verifying link's href attribute
  });

  test('renders correct alt text for background image', () => {
    renderWithRouter(<Home />); // Black-box testing: Rendering Home component with Router
    const backgroundImage = screen.getByAltText(/Background/i); // Black-box testing: Finding image by alt text
    expect(backgroundImage).toBeInTheDocument();  // Black-box testing: Verifying background image is rendered
  });

  test('ensures main content area contains correct elements', () => {
    renderWithRouter(<Home />); // Black-box testing: Rendering Home component with Router
    const content = screen.getByRole('main'); // Black-box testing: Finding main content area by role
    expect(content).toBeInTheDocument(); // Black-box testing: Verifying main content area is present
  });

  test('ensures the "Join Now" button has correct class name', () => {
    renderWithRouter(<Home />); // Black-box testing: Rendering Home component with Router
    const joinNowLink = screen.getByText(/Join Now/i); // Black-box testing: Finding "Join Now" link by text
    expect(joinNowLink).toHaveClass('joinNow'); // White-box testing: Verifying the correct class name is applied
  });

  test('renders the page title with correct styling class', () => {
    renderWithRouter(<Home />); // Black-box testing: Rendering Home component with Router
    const title = screen.getByText(/Track smarter, achieve higher/i); // Black-box testing: Finding title text
    expect(title).toHaveClass('title'); // White-box testing: Verifying correct class is applied to title
  });

  test('renders the page subtitle with correct styling class', () => {
    renderWithRouter(<Home />); // Black-box testing: Rendering Home component with Router
    const subtitle = screen.getByText(/Your all-in-one tool for monitoring grades/i); // Black-box testing: Finding subtitle text
    expect(subtitle).toHaveClass('subtitle'); // White-box testing: Verifying correct class is applied to subtitle
  });

  test('renders Navbar without profile link', () => {
    renderWithRouter(<Home />); // Black-box testing: Rendering Home component with Router
    const profileLink = screen.queryByText(/Profile/i); // Black-box testing: Querying for the "Profile" link
    expect(profileLink).not.toBeInTheDocument(); // Black-box testing: Verifying "Profile" link is not rendered
  });

  test('ensures footer contains correct role', () => {
    renderWithRouter(<Home />); // Black-box testing: Rendering Home component with Router
    const footerElement = screen.getByRole('contentinfo'); // Black-box testing: Finding footer by role
    expect(footerElement).toBeInTheDocument(); // Black-box testing: Verifying footer renders correctly
  });

  test('ensures main image is displayed with appropriate size', () => {
    renderWithRouter(<Home />); // Black-box testing: Rendering Home component with Router
    const backgroundImage = screen.getByAltText('Background'); // Black-box testing: Finding image by alt text
    expect(backgroundImage).toHaveAttribute('src', '/images/homepagePic.png'); // Black-box testing: Verifying correct image source
    expect(backgroundImage).toHaveClass('backgroundImage'); // White-box testing: Verifying image has the correct class name
  });
});
