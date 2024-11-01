// src/components/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer"; // Import Footer

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log("Login response:", result); // Log entire response
        if (result.data.message === "Success") {
          if (result.data.userId) {
            // Ensure userId exists
            localStorage.setItem("userId", result.data.userId);
            console.log("User ID saved:", localStorage.getItem("userId")); // Confirm it's saved
            navigate("/setup");
          } else {
            console.error("userId is undefined in the response.");
          }
        } else {
          alert(result.data); // Handle non-success messages
        }
      })
      .catch((error) => console.log("Error during login:", error));
  };

  return (
    <div className="login-container">
      <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
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
              Login
            </button>
          </form>
          <p>Already Have an Account?</p>
          <Link
            to="/register"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <Footer /> {/* Footer at the bottom */}
    </div>
  );
}

export default Login;
