// src/components/Footer.jsx
import React from 'react';  // Import React to support JSX
import { Link } from "react-router-dom";
import "../styles/footer.css"; // Ensure correct path for CSS
import { FaYoutube, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa"; // Import icons

const Footer = () => {
  return (
    <footer className="footer">
      {/* Left section with social media icons */}
      <div className="leftSection">
        <h2 className="logo">GRADETRACKR</h2>
        <div className="socialIcons">
          <a
            href="https://www.youtube.com"
            aria-label="YouTube"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
          <a
            href="https://www.twitter.com"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Right section with navigational links */}
      <div className="rightSection">
        <div className="column">
          <h3 className="columnHeader">Account</h3>
          <Link to="/register" className="link">
            Sign-up
          </Link>
          <Link to="/login" className="link">
            Log In
          </Link>
          <Link to="/help" className="link">
            Help
          </Link>
        </div>

        <div className="column">
          <h3 className="columnHeader">Product</h3>
          <Link to="/faq" className="link">
            FAQ
          </Link>
          <Link to="/feedback" className="link">
            Feedback
          </Link>
          <Link to="/resources" className="link">
            Resources
          </Link>
        </div>

        <div className="column">
          <h3 className="columnHeader">Company</h3>
          <Link to="/contact" className="link">
            Contact us
          </Link>
          <Link to="/our-story" className="link">
            Our Story
          </Link>
          <Link to="/privacy" className="link">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
