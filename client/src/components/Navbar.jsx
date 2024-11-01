import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ showSignup = true }) => {
  return (
    <nav className="navbar">
      {/* Logo on the left */}
      <div className="logoSection">
        <img src="/images/gradetracker logo.png" alt="GradeTrackr Logo" className="logo" />
        <Link to="/" className="brandName">
          GradeTrackr
        </Link>
      </div>

      {/* Right Section: Signup and Sign In links */}
      <div className="rightSection">
        {showSignup && (
          <>
            <Link to="/register" className="signupButton">
              Sign Up
            </Link>
            <Link to="/login" className="signinButton">
              Sign In
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
