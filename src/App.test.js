import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the landing page", () => {
  render(<App />);
  expect(screen.getByRole("heading")).toHaveTextContent(/Ad Testing Metrics/);
  // expect(screen.getByRole("search")).toHaveDisplayValue("Search By");
  // expect(screen.getByRole("sortBy")).toHaveDisplayValue("Sort By");
  // expect(screen.getByRole("search", { name: "Search" })).toHaveClass;
  // expect(screen.getByRole("img")).toBeInTheDocument();
});
