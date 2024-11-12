// src/components/__test__/FAQs.test.js
import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import FAQ from "../FAQs";

// Mock Navbar and Footer components with default export
vi.mock("../Navbar", () => ({
  default: () => <div>Navbar Mock</div>,
}));
vi.mock("../Footer", () => ({
  default: () => <div>Footer Mock</div>,
}));

describe("FAQ Component", () => {
  test("renders FAQ questions", () => {
    render(<FAQ />);

    // Check if the FAQ questions are rendered
    expect(screen.getByText("What is GradeTrackr?")).toBeInTheDocument();
    expect(screen.getByText("How do I sign up?")).toBeInTheDocument();
    expect(screen.getByText("Is my data secure?")).toBeInTheDocument();
  });

  test("toggles the answer when a question is clicked", () => {
    render(<FAQ />);

    // Click on the first question
    fireEvent.click(screen.getByText("What is GradeTrackr?"));

    // Check if the answer appears after clicking
    expect(screen.getByText("GradeTrackr is a web application that helps students track their academic progress with real-time GPA calculations and predictions.")).toBeInTheDocument();

    // Click again to collapse the answer
    fireEvent.click(screen.getByText("What is GradeTrackr?"));

    // Check if the answer disappears after collapsing
    expect(screen.queryByText("GradeTrackr is a web application that helps students track their academic progress with real-time GPA calculations and predictions.")).not.toBeInTheDocument();
  });

  test("only one answer is shown at a time", () => {
    render(<FAQ />);

    // Click on the first question
    fireEvent.click(screen.getByText("What is GradeTrackr?"));
    
    // Check if the first answer is visible
    expect(screen.getByText("GradeTrackr is a web application that helps students track their academic progress with real-time GPA calculations and predictions.")).toBeInTheDocument();

    // Click on the second question and ensure the first answer is hidden
    fireEvent.click(screen.getByText("How do I sign up?"));

    // Check if the second answer is visible
    expect(screen.getByText("Click the 'Sign Up' button on the homepage and fill out the form.")).toBeInTheDocument();

    // Check if the first answer is hidden
    expect(screen.queryByText("GradeTrackr is a web application that helps students track their academic progress with real-time GPA calculations and predictions.")).not.toBeInTheDocument();
  });

  test("renders Navbar and Footer correctly", () => {
    render(<FAQ />);

    // Check if Navbar and Footer are rendered
    expect(screen.getByText("Navbar Mock")).toBeInTheDocument();
    expect(screen.getByText("Footer Mock")).toBeInTheDocument();
  });

  // Failing test case: This test case checks if the feedback form submission is being delivered to the admin
  test("fails to deliver feedback form submission to admin", () => {
    render(<FAQ />);

    // Assuming there is a button that sends the feedback
    fireEvent.click(screen.getByText("Submit Feedback"));

    // Expected failure: Feedback is not being delivered to the admin
    expect(screen.queryByText("Feedback has been delivered to the admin successfully")).not.toBeInTheDocument();
  });
});
