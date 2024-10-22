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
          <Link href="https://www.youtube.com" aria-label="YouTube">
            <FaYoutube />
          </Link>
          <Link href="https://www.twitter.com" aria-label="Twitter">
            <FaTwitter />
          </Link>
          <Link href="https://www.linkedin.com" aria-label="LinkedIn">
            <FaLinkedin />
          </Link>
          <Link href="https://www.instagram.com" aria-label="Instagram">
            <FaInstagram />
          </Link>
        </div>
      </div>

      {/* Right side: Columns */}
      <div className="rightSection">
        {/* Account Column */}
        <div className="column">
          <h3 className="columnHeader">Account</h3>
          <Link href="/signup" className="link">
            Sign-up
          </Link>
          <Link href="/login" className="link">
            Log In
          </Link>
          <Link href="/help" className="link">
            Help
          </Link>
        </div>

        {/* Product Column */}
        <div className="column">
          <h3 className="columnHeader">Product</h3>
          <Link href="/faq" className="link">
            FAQ
          </Link>
          <Link href="/feedback" className="link">
            Feedback
          </Link>
          <Link href="/resources" className="link">
            Resources
          </Link>
        </div>

        {/* Company Column */}
        <div className="column">
          <h3 className="columnHeader">Company</h3>
          <Link href="/contact" className="link">
            Contact us
          </Link>
          <Link href="/our-story" className="link">
            Our story
          </Link>
          <Link href="/privacy" className="link">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
