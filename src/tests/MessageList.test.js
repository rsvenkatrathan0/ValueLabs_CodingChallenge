import MessageList from "../components/MessageList";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

test("renders two buttons", () => {
  render(<MessageList />);
  expect(screen.getByText(/STOP/)).toBeInTheDocument();
  expect(screen.getByText(/CLEAR/)).toBeInTheDocument();
});

test("text button changes when clicked", () => {
  render(<MessageList />);
  fireEvent.click(screen.getByText(/STOP/));
  expect(screen.getByText(/START/)).toBeInTheDocument();
});

test("renders 3 column titles", () => {
  render(<MessageList />);
  expect(screen.getByText(/Error Type 1/)).toBeInTheDocument();
  expect(screen.getByText(/Warning Type 2/)).toBeInTheDocument();
  expect(screen.getByText(/Info Type 3/)).toBeInTheDocument();
});
