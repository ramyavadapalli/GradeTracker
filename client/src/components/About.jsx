import Head from "next/head";
import Navbar from "../components/Navbar"; // Import the Navbar component
import Footer from "../components/Footer"; // Import the Footer component
import styles from "../styles/about.css"; // Adjust if necessary

export default function About() {
  return (
    <div className="container">
      <Head>
        <title>About</title>
      </Head>
      <Navbar showSignup={false} showProfile={true} /> Show Profile only
      <main className="main">
        <h1 className="title">About GradeTrackr</h1>
        <p className="description">
          GradeTrackr is your all-in-one tool for monitoring grades and
          achieving academic success. With a user-friendly interface and
          powerful features, we help students stay organized and informed. Join
          us today for free!
        </p>
      </main>
    </div>
  );
}
