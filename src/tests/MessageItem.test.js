import { fireEvent, render, screen } from "@testing-library/react";
import { MessageColumn } from "../components/MessageColumn";
import "@testing-library/jest-dom";
import { MessageItem } from "../components/MessageItem";

test("click clear fires event", () => {
  const handleClear = jest.fn();
  const m = { message: "test 1", priority: 2, id: 1 };

  const { getByText } = render(
    <MessageItem message={m} key={m.id} onClear={handleClear} />
  );

  expect(screen.getByTestId(/bgtest/)).toBeInTheDocument();

  fireEvent.click(getByText(/Clear/));

  expect(handleClear).toHaveBeenCalledTimes(1);
});
