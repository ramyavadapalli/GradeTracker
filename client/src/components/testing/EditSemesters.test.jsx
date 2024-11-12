import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import EditSemesters from "../EditSemesters";
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import axios from "axios";

// Mock axios
vi.mock("axios");

// Mock Navbar and Footer components with default export
vi.mock("../Navbar", () => ({
  default: () => <div>Navbar Mock</div>,
}));
vi.mock("../Footer", () => ({
  default: () => <div>Footer Mock</div>,
}));

// Correct way to mock react-router-dom with Vitest
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    BrowserRouter: ({ children }) => <div>{children}</div>, // Custom wrapper for Router
    useNavigate: vi.fn().mockReturnValue(() => {}), // Mock useNavigate if needed
  };
});

describe("EditSemesters Component", () => {
  const mockSemestersData = [
    { hours: 3, gpa: 3.5 },
    { hours: 4, gpa: 3.7 },
  ];

  const mockUserId = "123";

  beforeEach(() => {
    localStorage.setItem("userId", mockUserId); // Mock user ID in localStorage
    axios.get.mockResolvedValueOnce({ data: { semesters: mockSemestersData } }); // Mock API response
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders loading state initially", () => {
    axios.get.mockResolvedValueOnce({ data: { semesters: [] } });

    render(
      <BrowserRouter>
        <EditSemesters />
      </BrowserRouter>
    );

    expect(screen.getByText("No semesters found. Please add some semesters to edit.")).toBeInTheDocument();
  });

  test("renders semesters data and allows editing", async () => {
    render(
      <BrowserRouter>
        <EditSemesters />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByLabelText(/Semester 1/));

    expect(screen.getByLabelText("Semester 1")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Hours").value).toBe("3");
    expect(screen.getByPlaceholderText("GPA").value).toBe("3.5");

    fireEvent.change(screen.getByPlaceholderText("Hours"), { target: { value: "4" } });
    fireEvent.change(screen.getByPlaceholderText("GPA"), { target: { value: "3.8" } });

    expect(screen.getByPlaceholderText("Hours").value).toBe("4");
    expect(screen.getByPlaceholderText("GPA").value).toBe("3.8");
  });

  test("adds a new semester", async () => {
    render(
      <BrowserRouter>
        <EditSemesters />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText("Add Semester"));

    const addButton = screen.getByText("Add Semester");
    fireEvent.click(addButton);

    expect(screen.getAllByLabelText(/Semester/).length).toBe(3); 
  });

  test("deletes a semester", async () => {
    render(
      <BrowserRouter>
        <EditSemesters />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText("Delete Semester"));

    const deleteButton = screen.getAllByText("Delete Semester")[0];
    fireEvent.click(deleteButton);

    expect(screen.getAllByLabelText(/Semester/).length).toBe(1);
  });

  test("saves changes and navigates back", async () => {
    render(
      <BrowserRouter>
        <EditSemesters />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText("Save Changes"));

    const saveButton = screen.getByText("Save Changes");
    fireEvent.click(saveButton);

    expect(axios.post).toHaveBeenCalledWith("http://localhost:3001/setup", expect.objectContaining({
      userId: mockUserId,
      semesters: mockSemestersData,
      overallGPA: expect.any(String),
    }));

    expect(window.location.pathname).toBe("/dashboard");
  });
});

