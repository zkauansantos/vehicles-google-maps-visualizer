import { vehiclesService } from "..";

jest.mock("../getAll", () => ({
  getAll: jest.fn(),
}));

describe("vehiclesService", () => {
  it("should export getAllVehicles", () => {
    expect(vehiclesService).toHaveProperty("getAllVehicles");
  });
});
