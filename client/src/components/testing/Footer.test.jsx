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
    const logo = screen.getByText(/GRADETRACKR/i);
    expect(logo).toBeInTheDocument();
  });

  test('renders social media icons', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
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

    const socialLinks = screen.getAllByRole('link').filter(link => {
      const ariaLabel = link.getAttribute('aria-label');
      return ariaLabel && (
        ariaLabel.includes('YouTube') ||
        ariaLabel.includes('Twitter') ||
        ariaLabel.includes('LinkedIn') ||
        ariaLabel.includes('Instagram')
      );
    });

    expect(socialLinks.length).toBe(4);
  });

  // Additional Tests for Better Coverage

  test('renders correct headings for each column section', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const accountHeading = screen.getByText(/Account/i);
    const productHeading = screen.getByText(/Product/i);
    const companyHeading = screen.getByText(/Company/i);

    expect(accountHeading).toBeInTheDocument();
    expect(productHeading).toBeInTheDocument();
    expect(companyHeading).toBeInTheDocument();
  });

  test('checks that all links have correct href attributes', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText(/Sign-up/i).closest('a')).toHaveAttribute('href', '/register');
    expect(screen.getByText(/Log In/i).closest('a')).toHaveAttribute('href', '/login');
    expect(screen.getByText(/Help/i).closest('a')).toHaveAttribute('href', '/help');
    expect(screen.getByText(/FAQ/i).closest('a')).toHaveAttribute('href', '/faq');
    expect(screen.getByText(/Feedback/i).closest('a')).toHaveAttribute('href', '/feedback');
    expect(screen.getByText(/Resources/i).closest('a')).toHaveAttribute('href', '/resources');
    expect(screen.getByText(/Contact us/i).closest('a')).toHaveAttribute('href', '/contact');
    expect(screen.getByText(/Our Story/i).closest('a')).toHaveAttribute('href', '/our-story');
    expect(screen.getByText(/Privacy Policy/i).closest('a')).toHaveAttribute('href', '/privacy');
  });

  test('ensures social media links open in a new tab', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const socialLinks = screen.getAllByRole('link').filter(link => {
      const ariaLabel = link.getAttribute('aria-label');
      return ariaLabel && (
        ariaLabel.includes('YouTube') ||
        ariaLabel.includes('Twitter') ||
        ariaLabel.includes('LinkedIn') ||
        ariaLabel.includes('Instagram')
      );
    });
    socialLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  test('ensures footer contains correct class names for styling', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toHaveClass('footer');
    const leftSection = screen.getByText(/GRADETRACKR/i).closest('div');
    expect(leftSection).toHaveClass('leftSection');
    const columnSection = screen.getByText(/Account/i).closest('div');
    expect(columnSection).toHaveClass('column');
  });

  test('checks that footer has appropriate role', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  test('checks that column headers have correct semantic tags', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const accountHeader = screen.getByRole('heading', { name: /Account/i });
    const productHeader = screen.getByRole('heading', { name: /Product/i });
    const companyHeader = screen.getByRole('heading', { name: /Company/i });

    expect(accountHeader).toBeInTheDocument();
    expect(productHeader).toBeInTheDocument();
    expect(companyHeader).toBeInTheDocument();
  });

  test('renders social media icons with correct aria-labels', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const youtubeIcon = screen.getByLabelText('YouTube');
    const twitterIcon = screen.getByLabelText('Twitter');
    const linkedinIcon = screen.getByLabelText('LinkedIn');
    const instagramIcon = screen.getByLabelText('Instagram');

    expect(youtubeIcon).toBeInTheDocument();
    expect(twitterIcon).toBeInTheDocument();
    expect(linkedinIcon).toBeInTheDocument();
    expect(instagramIcon).toBeInTheDocument();
  });
});
