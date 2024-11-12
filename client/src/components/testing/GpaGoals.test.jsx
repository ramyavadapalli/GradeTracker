import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import GpaGoals from "../GpaGoals";

// Mock Navbar and Footer components
vi.mock("../Navbar", () => ({
  default: () => <div>Navbar Mock</div>,
}));
vi.mock("../Footer", () => ({
  default: () => <div>Footer Mock</div>,
}));

describe("GpaGoals Component", () => {
  test("renders GPA goal form with fields for semester and cumulative goals", () => {
    render(<GpaGoals />);

    // Check if the form fields are rendered
    expect(screen.getByLabelText("Semester GPA Goal:")).toBeInTheDocument();
    expect(screen.getByLabelText("Cumulative GPA Goal:")).toBeInTheDocument();
    expect(screen.getByText("Set Goals")).toBeInTheDocument();
  });

  test("allows user to type in semester and cumulative GPA goals", () => {
    render(<GpaGoals />);

    const semesterInput = screen.getByLabelText("Semester GPA Goal:");
    const cumulativeInput = screen.getByLabelText("Cumulative GPA Goal:");

    fireEvent.change(semesterInput, { target: { value: "3.5" } });
    fireEvent.change(cumulativeInput, { target: { value: "3.8" } });

    expect(semesterInput.value).toBe("3.5");
    expect(cumulativeInput.value).toBe("3.8");
  });

  test("displays success message when both goals are set", () => {
    render(<GpaGoals />);

    fireEvent.change(screen.getByLabelText("Semester GPA Goal:"), { target: { value: "3.5" } });
    fireEvent.change(screen.getByLabelText("Cumulative GPA Goal:"), { target: { value: "3.8" } });
    fireEvent.click(screen.getByText("Set Goals"));

    expect(screen.getByText("Your goals have been set! Semester Goal: 3.5, Cumulative Goal: 3.8")).toBeInTheDocument();
  });

  test("displays error message when one or both goals are not set", () => {
    render(<GpaGoals />);

    fireEvent.change(screen.getByLabelText("Semester GPA Goal:"), { target: { value: "" } });
    fireEvent.change(screen.getByLabelText("Cumulative GPA Goal:"), { target: { value: "3.8" } });
    fireEvent.click(screen.getByText("Set Goals"));

    expect(screen.getByText("Please fill out both goals.")).toBeInTheDocument();
  });

  test("renders Navbar and Footer correctly", () => {
    render(<GpaGoals />);

    // Check if Navbar and Footer are rendered
    expect(screen.getByText("Navbar Mock")).toBeInTheDocument();
    expect(screen.getByText("Footer Mock")).toBeInTheDocument();
  });
});
