import { Link } from "react-router-dom";
import "../styles/home.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React from "react";

function Home() {
  return (
    <div className="container">
      <h2>
        <title>GradeTrackr</title>
      </h2>

      <Navbar showSignup={true} showProfile={false} />

      <main className="main">
        <img
          src="/homepagePic.png"
          alt="Background"
          className="backgroundImage"
        />
        <h1 className="title">
          Track smarter,
          <br /> achieve higher
        </h1>
        <p className="subtitle">
          Your all-in-one tool for monitoring <br />
          grades and achieving academic <br />
          success. All for free.
        </p>

        {/* Update the route to '/register' */}
        <Link to="/register" className="joinNow">
          Join Now
        </Link>

        {/* <div className="gradetrackrWrapper">
          <h2 className="gradetrackrTitle">Calculate Your GPA</h2>
          <GradeTrackr />
        </div> */}
      </main>

      <Footer />
    </div>
  );
}

export default Home;
