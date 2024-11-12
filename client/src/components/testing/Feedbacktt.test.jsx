import React from "react";
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Feedback from "../Feedbacktt";

// Mock Navbar and Footer components with default export
vi.mock("../Navbar", () => ({
  default: () => <div>Navbar Mock</div>,
}));
vi.mock("../Footer", () => ({
  default: () => <div>Footer Mock</div>,
}));

// Mock the fetch function globally
global.fetch = vi.fn();

describe("Feedback Component", () => {
  test("renders feedback form with name, email, and message fields", () => {
    render(<Feedback />);

    // Check if the form fields are rendered
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  test("allows user to type in the name, email, and message fields", () => {
    render(<Feedback />);

    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");
    const messageInput = screen.getByLabelText("Message");

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "johndoe@example.com" } });
    fireEvent.change(messageInput, { target: { value: "This is my feedback." } });

    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("johndoe@example.com");
    expect(messageInput.value).toBe("This is my feedback.");
  });

  test("displays 'Submitting...' status when form is submitted", async () => {
    render(<Feedback />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "johndoe@example.com" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "This is my feedback." } });

    fireEvent.click(screen.getByText("Submit"));

    expect(screen.getByText("Submitting...")).toBeInTheDocument();
  });

  test("displays success message when feedback is successfully submitted", async () => {
    fetch.mockResolvedValueOnce({ ok: true }); // Mock successful response

    render(<Feedback />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "johndoe@example.com" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "This is my feedback." } });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => screen.getByText("Thank you for your feedback!"));
    expect(screen.getByText("Thank you for your feedback!")).toBeInTheDocument();
  });

  test("displays error message when feedback submission fails", async () => {
    fetch.mockResolvedValueOnce({ ok: false }); // Mock failed response

    render(<Feedback />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "johndoe@example.com" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "This is my feedback." } });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => screen.getByText("Failed to submit feedback. Please try again."));
    expect(screen.getByText("Failed to submit feedback. Please try again.")).toBeInTheDocument();
  });

  test("displays error message when there is a network error", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error")); // Mock network error

    render(<Feedback />);

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "johndoe@example.com" } });
    fireEvent.change(screen.getByLabelText("Message"), { target: { value: "This is my feedback." } });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => screen.getByText("An error occurred. Please try again later."));
    expect(screen.getByText("An error occurred. Please try again later.")).toBeInTheDocument();
  });

  test("renders Navbar and Footer correctly", () => {
    render(<Feedback />);

    // Check if Navbar and Footer are rendered
    expect(screen.getByText("Navbar Mock")).toBeInTheDocument();
    expect(screen.getByText("Footer Mock")).toBeInTheDocument();
  });
});
