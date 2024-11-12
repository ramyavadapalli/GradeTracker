// src/components/FAQs.jsx
import React, { useState } from "react";
import Navbar from "./Navbar"; // Import Navbar
import Footer from "./Footer"; // Import Footer
import "../styles/FAQ.css"; // Correct path to the FAQ.css file

const faqData = [
  {
    question: "What is GradeTrackr?",
    answer:
      "GradeTrackr is a web application that helps students track their academic progress with real-time GPA calculations and predictions.",
  },
  {
    question: "How do I sign up?",
    answer: "Click the 'Sign Up' button on the homepage and fill out the form.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes! We ensure your data is stored securely and never shared with third parties.",
  },
  {
    question: "How can I provide feedback?",
    answer: "Visit the Feedback page using the link in the navbar.",
  },
  {
    question: "Can I track multiple semesters?",
    answer: "Yes, GradeTrackr allows you to input multiple semesters and calculates your cumulative GPA.",
  },
  {
    question: "What happens if I forget my password?",
    answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page.",
  },
  {
    question: "Is GradeTrackr free to use?",
    answer: "Yes, GradeTrackr is completely free for students to use.",
  },
  {
    question: "What browsers are supported?",
    answer: "GradeTrackr works on all modern browsers, including Chrome, Firefox, Safari, and Edge.",
  },
  {
    question: "Can I access GradeTrackr on my phone?",
    answer: "Yes, GradeTrackr is mobile-friendly and accessible on any device with a web browser.",
  },
  {
    question: "How do I update my profile information?",
    answer: "You can update your profile by visiting the Profile page after logging in.",
  },
  {
    question: "How can I delete my account?",
    answer: "If you wish to delete your account, please contact our support team through the Feedback page.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="page-container">
      <Navbar /> {/* Header / Navbar */}
      <main className="container">
        <h1 className="title">Frequently Asked Questions (FAQ)</h1>
        <div className="faqList">
          {faqData.map((item, index) => (
            <div key={index} className="faqItem">
              <button
                className="question"
                onClick={() => toggleAnswer(index)}
              >
                {item.question}
              </button>
              {openIndex === index && <p className="answer">{item.answer}</p>}
            </div>
          ))}
        </div>
      </main>
      <Footer /> {/* Footer */}
    </div>
  );
};

export default FAQ;
