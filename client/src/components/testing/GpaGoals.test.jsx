import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import GpaGoals from "../GpaGoals";

// Mock Navbar and Footer components
// This is a black box test as it focuses on ensuring that the Navbar and Footer are properly mocked without knowing their internal implementation
vi.mock("../Navbar", () => ({
  default: () => <div>Navbar Mock</div>,
}));
vi.mock("../Footer", () => ({
  default: () => <div>Footer Mock</div>,
}));

describe("GpaGoals Component", () => {
  // Black box test: Verifies that the GPA goal form renders with the expected input fields and button without inspecting internal implementation details
  test("renders GPA goal form with fields for semester and cumulative goals", () => {
    render(<GpaGoals />);

    // Check if the form fields are rendered
    expect(screen.getByLabelText("Semester GPA Goal:")).toBeInTheDocument();
    expect(screen.getByLabelText("Cumulative GPA Goal:")).toBeInTheDocument();
    expect(screen.getByText("Set Goals")).toBeInTheDocument();
  });

  // Black box test: Ensures users can type in the semester and cumulative GPA goals without checking the internal implementation of input handling
  test("allows user to type in semester and cumulative GPA goals", () => {
    render(<GpaGoals />);

    const semesterInput = screen.getByLabelText("Semester GPA Goal:");
    const cumulativeInput = screen.getByLabelText("Cumulative GPA Goal:");

    fireEvent.change(semesterInput, { target: { value: "3.5" } });
    fireEvent.change(cumulativeInput, { target: { value: "3.8" } });

    expect(semesterInput.value).toBe("3.5");
    expect(cumulativeInput.value).toBe("3.8");
  });

  // Black box test: Verifies that the success message is displayed when both GPA goals are set correctly without accessing internal state or logic
  test("displays success message when both goals are set", () => {
    render(<GpaGoals />);

    fireEvent.change(screen.getByLabelText("Semester GPA Goal:"), { target: { value: "3.5" } });
    fireEvent.change(screen.getByLabelText("Cumulative GPA Goal:"), { target: { value: "3.8" } });
    fireEvent.click(screen.getByText("Set Goals"));

    expect(screen.getByText("Your goals have been set! Semester Goal: 3.5, Cumulative Goal: 3.8")).toBeInTheDocument();
  });

  // Black box test: Ensures that an error message is displayed when one or both GPA goals are not set without checking the internal validation logic
  test("displays error message when one or both goals are not set", () => {
    render(<GpaGoals />);

    fireEvent.change(screen.getByLabelText("Semester GPA Goal:"), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText("Cumulative GPA Goal:"), { target: { value: "3.8" } });
    fireEvent.click(screen.getByText("Set Goals"));

    expect(screen.getByText("Please fill out both goals.")).toBeInTheDocument();
  });

  // Black box test: Verifies that the Navbar and Footer components are correctly rendered without inspecting the internal implementation details
  test("renders Navbar and Footer correctly", () => {
    render(<GpaGoals />);

    // Check if Navbar and Footer are rendered
    expect(screen.getByText("Navbar Mock")).toBeInTheDocument();
    expect(screen.getByText("Footer Mock")).toBeInTheDocument();
  });
});
