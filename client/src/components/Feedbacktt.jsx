import React, { useState } from 'react';
import Navbar from '../components/Navbar'; // Adjust the import path if necessary
import Footer from '../components/Footer'; // Adjust the import path if necessary
import "../styles/Feedback.css"; // Ensure the correct path to your CSS

const Feedback = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const res = await fetch('http://localhost:3001/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setStatus('Thank you for your feedback!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('Failed to submit feedback. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setStatus('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="page-container">
      <Navbar /> {/* Header / Navbar */}
      <main className="container">
        <h1 className="title">We Value Your Feedback</h1>
        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        {status && <p className="status-message">{status}</p>}
      </main>
      <Footer /> {/* Footer */}
    </div>
  );
};

export default Feedback;
