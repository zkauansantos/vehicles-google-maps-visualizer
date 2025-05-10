import { generateRandomPinColor } from "../colors";

describe("generateRandomPinColor", () => {
  it("should return a valid color from the possibleColors array", () => {
    const possibleColors = [
      "fill-primary",
      "fill-warning",
      "fill-caution",
      "fill-success",
    ];

    const color = generateRandomPinColor();

    expect(possibleColors).toContain(color);
  });
});
