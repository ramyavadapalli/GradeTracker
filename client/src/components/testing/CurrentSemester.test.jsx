import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CurrentSemester from "../CurrentSemester/CurrentSemester";

// Mocking the GradingSections component
vi.mock("../CurrentSemester/GradingSectionsForm", () => ({
  default: () => <div data-testid="grading-sections">Grading Sections Form</div>,
}));

describe("CurrentSemester Component", () => {
  test("renders the initial step with course number input", () => {
    render(<CurrentSemester />);
    expect(screen.getByText("Vanderbilt University")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter # of courses...")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  test("proceeds to step 2 after entering a valid number of courses", () => {
    render(<CurrentSemester />);
    
    const input = screen.getByPlaceholderText("Enter # of courses...");
    fireEvent.change(input, { target: { value: "2" } });
    
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    
    // Wait for the course detail input to appear
    expect(screen.getByText("Enter your course details")).toBeInTheDocument();
  });

  test("allows entering course details on step 2", async () => {
    render(<CurrentSemester />);
    
    // Step 1: Enter number of courses
    fireEvent.change(screen.getByPlaceholderText("Enter # of courses..."), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByText("Next"));
    
    // Step 2: Verify course inputs
    expect(screen.getByText("Course 1")).toBeInTheDocument();
    fireEvent.change(screen.getAllByPlaceholderText("Enter course name...")[0], {
      target: { value: "Math 101" },
    });
    fireEvent.change(screen.getAllByPlaceholderText("Enter # of hours...")[0], {
      target: { value: "3" },
    });
    
    // Ensure the values are updated
    expect(screen.getByDisplayValue("Math 101")).toBeInTheDocument();
    expect(screen.getByDisplayValue("3")).toBeInTheDocument();
  });

  test("proceeds to grading sections form on step 3", async () => {
    render(<CurrentSemester />);
    
    // Step 1: Enter number of courses
    fireEvent.change(screen.getByPlaceholderText("Enter # of courses..."), {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByText("Next"));
    
    // Step 2: Enter course details
    fireEvent.change(screen.getByPlaceholderText("Enter course name..."), {
      target: { value: "Math 101" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter # of hours..."), {
      target: { value: "3" },
    });
    fireEvent.click(screen.getByText("Next"));
    
    // Debugging step: Add this line to check the rendered DOM at this point
    screen.debug(); 

    // Step 3: Check if GradingSections form is rendered
    await waitFor(() => {
      expect(screen.getByTestId("grading-sections")).toBeInTheDocument();
    });
  });

  test("navigates back to previous steps", async () => {
    render(<CurrentSemester />);
    
    // Step 1: Enter number of courses
    fireEvent.change(screen.getByPlaceholderText("Enter # of courses..."), {
      target: { value: "1" },
    });
    fireEvent.click(screen.getByText("Next"));
    
    // Step 2: Navigate back to step 1
    fireEvent.click(screen.getByText("Back"));
    
    expect(screen.getByPlaceholderText("Enter # of courses...")).toBeInTheDocument();
  });
});
