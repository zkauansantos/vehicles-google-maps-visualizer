import { render, screen } from "@testing-library/react";

import { Header } from "..";

describe("Header Component", () => {
  it("should render the header with the correct text", () => {
    render(<Header />);
    const headerElement = screen.getByRole("banner");
    const headingElement = screen.getByText("Kauan Santos");

    expect(headerElement).toBeInTheDocument();
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveClass(
      "text-white text-lg px-6 font-secondary",
    );
  });

  it("should have the correct styles applied to the header", () => {
    render(<Header />);
    const headerElement = screen.getByRole("banner");

    expect(headerElement).toHaveClass(
      "w-full z-20 fixed top-0 left-0 bg-primary-20 h-14 flex items-center",
    );
  });
});
