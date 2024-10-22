import { Link } from "react-router-dom";
import "../styles/home.css"; // Ensure correct CSS path
import Navbar from "../components/Navbar"; // Import Navbar
import Footer from "../components/Footer"; // Import Footer
import React from "react";

function Home() {
  return (
    <>
      {/* Navbar at the top */}
      <Navbar showSignup={true} showProfile={false} />

      <main className="main">
        {/* Background Image */}
        <img
          src="/images/homepagePic.png"
          alt="Background"
          className="backgroundImage"
        />

        {/* Main Content */}
        <div className="content">
          <h1 className="title">
            Track smarter, <br /> achieve higher
          </h1>
          <p className="subtitle">
            Your all-in-one tool for monitoring <br />
            grades and achieving academic <br />
            success. All for free.
          </p>

          <Link to="/register" className="joinNow">
            Join Now
          </Link>
        </div>
      </main>

      {/* Footer at the bottom */}
      <Footer />
    </>
  );
}

export default Home;
