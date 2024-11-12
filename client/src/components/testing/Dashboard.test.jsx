// src/components/__test__/Dashboard.test.js
import React from "react";
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Dashboard from "../Dashboard";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";

// Mock axios
vi.mock("axios");

// Mock react-chartjs-2's Bar component
vi.mock("react-chartjs-2", () => ({
  Bar: () => <div role="chart">Mocked Chart</div>,
}));

describe("Dashboard Component", () => {
  const mockUserData = {
    name: "John Doe",
    semesters: [
      { gpa: 3.5 },
      { gpa: 3.7 },
      { gpa: 3.9 },
    ],
    overallGPA: 3.7,
  };

  beforeEach(() => {
    localStorage.setItem("userId", "123");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders loading state when user data is not yet available", () => {
    axios.get.mockResolvedValueOnce({ data: null });

    render(
      <Router>
        <Dashboard />
      </Router>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders Dashboard with user data when available", async () => {
    axios.get.mockResolvedValueOnce({ data: mockUserData });

    render(
      <Router>
        <Dashboard />
      </Router>
    );

    // Wait for the component to fetch data and re-render
    await waitFor(() => screen.getByText("Hi, John Doe!"));

    // Check if the greeting and other user data is rendered
    expect(screen.getByText("Hi, John Doe!")).toBeInTheDocument();
    expect(screen.getByText("Overall GPA Trend")).toBeInTheDocument();
    expect(screen.getByText("Cumulative GPA: 3.7")).toBeInTheDocument();
    expect(screen.getByText("Set GPA Goals")).toBeInTheDocument();

    // Check if the mocked chart is rendered
    expect(screen.getByRole("chart")).toBeInTheDocument();
  });

  test("navigates when clicking list items", async () => {
    axios.get.mockResolvedValueOnce({ data: mockUserData });

    render(
      <Router>
        <Dashboard />
      </Router>
    );

    await waitFor(() => screen.getByText("Hi, John Doe!"));

    // Test navigation for Set GPA Goals
    fireEvent.click(screen.getByText("Set GPA Goals"));
    expect(window.location.pathname).toBe("/gpa-goals");

    // Test navigation for Current Semester
    fireEvent.click(screen.getByText("Current Semester"));
    expect(window.location.pathname).toBe("/current-semester");

    // Test navigation for Edit Previous Semesters
    fireEvent.click(screen.getByText("Edit Previous Semesters"));
    expect(window.location.pathname).toBe("/edit-semesters");
  });
});
