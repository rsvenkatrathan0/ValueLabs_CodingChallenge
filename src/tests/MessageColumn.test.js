import { render, screen } from "@testing-library/react";
import { MessageColumn } from "../components/MessageColumn";
import "@testing-library/jest-dom";

test("render column with one element", () => {
  const messages = [{ message: "test", priority: 1, id: 1 }];
  render(<MessageColumn messages={messages} type={1} onDelete={() => {}} />);

  expect(screen.getByText(/Error Type 1/)).toBeInTheDocument();
  expect(screen.getAllByText(/test/).length).toBe(1);
  expect(screen.getByText(/Count 1/)).toBeInTheDocument();
});

test("render clear text", () => {
  const messages = [
    { message: "test 1", priority: 2, id: 1 },
    { message: "test 2", priority: 2, id: 2 },
  ];
  render(<MessageColumn messages={messages} type={1} onDelete={() => {}} />);

  expect(screen.getAllByText(/Clear/).length).toBe(2);
});

test("render right bg", () => {
  const messages = [
    { message: "test 1", priority: 2, id: 1 },
    { message: "test 2", priority: 2, id: 2 },
  ];
  render(<MessageColumn messages={messages} type={1} onDelete={() => {}} />);

  expect(screen.getAllByTestId(/bgtest/)[0]).toHaveStyle({
    backgroundColor: "#FCE788!important",
  });
});
