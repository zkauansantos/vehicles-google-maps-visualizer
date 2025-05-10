import {
  formatDate,
  formatQueryParams,
  formatVehiclePlate,
} from "../formatters";

describe("formatQueryParams", () => {
  it("should return an empty string if no filters are provided", () => {
    expect(formatQueryParams()).toBe("");
  });

  it("should return a query string for valid filters", () => {
    const filters = { name: "John", age: 30 };
    expect(formatQueryParams(filters)).toBe("?name=John&age=30");
  });

  it("should ignore filters with falsy values", () => {
    const filters = { name: "John", age: null, active: false };
    expect(formatQueryParams(filters)).toBe("?name=John");
  });

  it("should return an empty string if all filters have falsy values", () => {
    const filters = { name: null, age: undefined, active: false };
    expect(formatQueryParams(filters)).toBe("");
  });
});

describe("formatVehiclePlate", () => {
  it("should format old plate format correctly", () => {
    expect(formatVehiclePlate("abc1234")).toBe("ABC 1234");
  });

  it("should format Mercosul plate format correctly", () => {
    expect(formatVehiclePlate("abc1d23")).toBe("ABC 1D23");
  });

  it("should return the original plate if it doesn't match any format", () => {
    expect(formatVehiclePlate("invalidPlate")).toBe("invalidPlate");
  });

  it("should trim and convert the plate to uppercase", () => {
    expect(formatVehiclePlate("  abc1234  ")).toBe("ABC 1234");
  });
});

describe("formatDate", () => {
  it("should return an empty string if no date is provided", () => {
    expect(formatDate()).toBe("");
  });

  it("should return an empty string for an invalid date", () => {
    expect(formatDate("invalid-date")).toBe("");
  });

  it("should format a valid Date object correctly", () => {
    const date = new Date("2023-03-15T10:30:00");
    expect(formatDate(date)).toBe("15/03/2023 - 10:30");
  });

  it("should format a valid date string correctly", () => {
    expect(formatDate("2023-03-15T10:30:00")).toBe("15/03/2023 - 10:30");
  });

  it("should pad single-digit day and month with leading zeros", () => {
    const date = new Date("2023-01-05T09:05:00");
    expect(formatDate(date)).toBe("05/01/2023 - 09:05");
  });
});
