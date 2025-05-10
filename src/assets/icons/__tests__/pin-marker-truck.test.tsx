import { render } from "@testing-library/react";

import { generateRandomPinColor } from "@/utils/colors";

import { PinMarkerTruck } from "../pin-marker-truck";

jest.mock("@/utils/colors", () => ({
  generateRandomPinColor: jest.fn(),
}));

describe("PinMarkerTruck", () => {
  it("should render the SVG element with the correct attributes", () => {
    (generateRandomPinColor as jest.Mock).mockReturnValue("random-color");

    const { container } = render(<PinMarkerTruck />);

    const svgElement = container.querySelector("svg");

    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("width", "41");
    expect(svgElement).toHaveAttribute("height", "63");
    expect(svgElement).toHaveAttribute("viewBox", "0 0 41 63");
    expect(svgElement).toHaveClass("random-color");
  });

  it("should call generateRandomPinColor to set the class name", () => {
    render(<PinMarkerTruck />);
    expect(generateRandomPinColor).toHaveBeenCalled();
  });

  it("should render all circles and paths correctly", () => {
    const { container } = render(<PinMarkerTruck />);
    const circles = container.querySelectorAll("circle");
    const paths = container.querySelectorAll("path");

    expect(circles.length).toBe(3);
    expect(paths.length).toBe(2);
  });
});
