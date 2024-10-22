import { Link } from "react-router-dom";
import "../styles/footer.css"; // Adjust the path if necessary
import { FaYoutube, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa"; // Import icons

const Footer = () => {
  return (
    <footer className="footer">
      {/* Left side: Social media icons */}
      <div className="leftSection">
        <h2 className="logo">GRADETRACKR</h2>
        <div className="socialIcons">
          <a href="https://www.youtube.com" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
          <a href="https://www.twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://www.linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Right side: Columns */}
      <div className="rightSection">
        {/* Account Column */}
        <div className="column">
          <h3 className="columnHeader">Account</h3>
          <Link to="/signup" className="link">
            Sign-up
          </Link>
          <Link to="/login" className="link">
            Log In
          </Link>
          <Link to="/help" className="link">
            Help
          </Link>
        </div>

        {/* Product Column */}
        <div className="column">
          <h3 className="columnHeader">Product</h3>
          <Link to="/faq" className="link">
            FAQ
          </Link>
          <Link to="/feedback" className="link">
            Feedback
          </Link> {/* Feedback link added */}
          <Link to="/resources" className="link">
            Resources
          </Link>
        </div>

        {/* Company Column */}
        <div className="column">
          <h3 className="columnHeader">Company</h3>
          <Link to="/contact" className="link">
            Contact us
          </Link>
          <Link to="/our-story" className="link">
            Our story
          </Link>
          <Link to="/privacy" className="link">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
