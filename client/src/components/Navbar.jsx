import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // Import the logout icon
import "../styles/Navbar.css"; // Assuming your CSS file is Navbar.css

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("userId") !== null;

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Logo on the left */}
      <div className="logoSection">
        <img
          src="/images/gradetracker logo.png"
          alt="GradeTrackr Logo"
          className="logo"
        />
        <Link to="/" className="brandName">
          GradeTrackr
        </Link>
      </div>

      {/* Right Section: Logout button with icon if logged in */}
      <div className="rightSection">
        {isLoggedIn && (
          <button onClick={handleLogout} className="logoutButton">
            <FaSignOutAlt className="logoutIcon" /> {/* Icon for logout */}
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


// const Navbar = ({ showSignup = true }) => {
//   return (
//     <nav className="navbar">
//       {/* Logo on the left */}
//       <div className="logoSection">
//         <img src="/images/gradetracker logo.png" alt="GradeTrackr Logo" className="logo" />
//         <Link to="/" className="brandName">
//           GradeTrackr
//         </Link>
//       </div>

//       {/* Right Section: Signup and Sign In links */}
//       <div className="rightSection">
//         {showSignup && (
//           <>
//             <Link to="/register" className="signupButton">
//               Sign Up
//             </Link>
//             <Link to="/login" className="signinButton">
//               Sign In
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
