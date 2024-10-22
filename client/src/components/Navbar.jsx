import { Link } from "react-router-dom";
import "../styles/home.css";

const Navbar = ({ showSignup, showProfile }) => {
  return (
    <header className="header">
      <nav className="navbar">
        <Link href="/" className="logo">
          <img
            src="/gradetracker logo.png"
            alt="GradeTrackr Logo"
            className="logoImage"
          />
          <span className="logoText">GradeTrackr</span>
        </Link>
        {showSignup && (
          <Link to="/register" className="profileTab">
            Sign Up
          </Link>
        )}
        {showProfile && (
          <Link href="/profile" className="profileTab">
            Profile
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
