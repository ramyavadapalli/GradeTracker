import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("userId") !== null;

  // If the user is not logged in, redirect to the homepage
  return isLoggedIn ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
