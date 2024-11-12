import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer"; // Import Footer
import Navbar from "./Navbar"; // Import Navbar

const apiUrl = import.meta.env.VITE_API_URL;

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${apiUrl}/signup`, { name, email, password }) // Use apiUrl for the base URL
      .then((result) => {
        if (result.data && result.data._id) {
          localStorage.setItem("userId", result.data._id);
          navigate("/setup");
        } else {
          alert("Failed to create account. Please try again.");
        }
      })
      .catch((error) => console.log("Error during signup:", error));
  };

  return (
    <>
      <Navbar /> {/* Navbar at the top */}
      <div className="signup-container">
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
          <div className="bg-white p-3 rounded w-25">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name">
                  <strong>Name</strong>
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  autoComplete="off"
                  name="name"
                  className="form-control rounded-0"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email">
                  <strong>Email</strong>
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  autoComplete="off"
                  name="email"
                  className="form-control rounded-0"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password">
                  <strong>Password</strong>
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  className="form-control rounded-0"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-success w-100 rounded-0">
                Register
              </button>
            </form>
            <p>Already Have an Account?</p>
            <Link
              to="/login"
              className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
            >
              Login
            </Link>
          </div>
        </div>
        <Footer /> {/* Footer at the bottom */}
      </div>
    </>
  );
}

export default Signup;
