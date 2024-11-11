/// <reference types="vitest" />
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../Footer';

describe('Footer component', () => {

  // -------------------- Black-box Testing --------------------
  test('renders GRADETRACKR logo', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    // Black-box testing: testing functionality without knowledge of the internal code.
    // We check if the logo (GRADETRACKR) appears in the footer.
    const logo = screen.getByText(/GRADETRACKR/i);
    expect(logo).toBeInTheDocument();
  });

  test('renders social media icons', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    // Black-box testing: testing the presence of social media icons (YouTube, Twitter, LinkedIn, Instagram)
    // without knowing their exact implementation in the component.
    const youtubeIcon = screen.getByLabelText(/YouTube/i);
    const twitterIcon = screen.getByLabelText(/Twitter/i);
    const linkedinIcon = screen.getByLabelText(/LinkedIn/i);
    const instagramIcon = screen.getByLabelText(/Instagram/i);
    expect(youtubeIcon).toBeInTheDocument();
    expect(twitterIcon).toBeInTheDocument();
    expect(linkedinIcon).toBeInTheDocument();
    expect(instagramIcon).toBeInTheDocument();
  });

  test('renders Account, Product, and Company sections with correct links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    // Black-box testing: testing that the footer sections (Account, Product, Company) 
    // contain the correct links without focusing on their internal implementation.
    const signUpLink = screen.getByText(/Sign-up/i);
    const loginLink = screen.getByText(/Log In/i);
    const helpLink = screen.getByText(/Help/i);
    const faqLink = screen.getByText(/FAQ/i);
    const feedbackLink = screen.getByText(/Feedback/i);
    const resourcesLink = screen.getByText(/Resources/i);
    const contactLink = screen.getByText(/Contact us/i);
    const ourStoryLink = screen.getByText(/Our Story/i);
    const privacyPolicyLink = screen.getByText(/Privacy Policy/i);

    expect(signUpLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
    expect(helpLink).toBeInTheDocument();
    expect(faqLink).toBeInTheDocument();
    expect(feedbackLink).toBeInTheDocument();
    expect(resourcesLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(ourStoryLink).toBeInTheDocument();
    expect(privacyPolicyLink).toBeInTheDocument();
  });

  // -------------------- White-box Testing --------------------
  test('checks for correct number of social media links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    // White-box testing: testing the internal logic and structure of the component.
    // We know the Footer component contains social media links, so we directly check 
    // that there are exactly 4 social media links in the rendered component.
    const socialLinks = screen.getAllByRole('link').filter(link => {
      const ariaLabel = link.getAttribute('aria-label');
      return ariaLabel && (
        ariaLabel.includes('YouTube') ||
        ariaLabel.includes('Twitter') ||
        ariaLabel.includes('LinkedIn') ||
        ariaLabel.includes('Instagram')
      );
    });

    // Expecting exactly 4 social media links
    expect(socialLinks.length).toBe(4);
  });
});

