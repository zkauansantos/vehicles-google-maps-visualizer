import { ZodError } from "zod";

import { filterVehiclesSchema } from "../schema";
import { VehicleType } from "../types";

describe("filterVehiclesSchema", () => {
  it("should validate valid data", () => {
    const validData = {
      type: VehicleType.TRACKED,
    };

    const result = filterVehiclesSchema.safeParse(validData);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toEqual(validData);
    }
  });

  it("should validate data with optional filter", () => {
    const validData = {
      filter: "ABC123",
      type: VehicleType.OTHERS,
    };

    const result = filterVehiclesSchema.safeParse(validData);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toEqual(validData);
    }
  });

  it("should validate data with empty filter", () => {
    const validData = {
      filter: "",
      type: VehicleType.TRACKED,
    };

    const result = filterVehiclesSchema.safeParse(validData);

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data).toEqual(validData);
    }
  });

  it("should reject data without type", () => {
    const invalidData = {
      filter: "ABC123",
    };

    const result = filterVehiclesSchema.safeParse(invalidData);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(
        result.error.issues.some((issue) => issue.path.includes("type")),
      ).toBe(true);
    }
  });

  it("should reject data with undefined type", () => {
    const invalidData = {
      filter: "ABC123",
      type: undefined,
    };

    const result = filterVehiclesSchema.safeParse(invalidData);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(
        result.error.issues.some((issue) => issue.path.includes("type")),
      ).toBe(true);
    }
  });

  it("should reject data with invalid type value", () => {
    const invalidData = {
      filter: "ABC123",
      type: "INVALID_TYPE",
    };

    const result = filterVehiclesSchema.safeParse(invalidData);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(
        result.error.issues.some(
          (issue) =>
            issue.path.includes("type") && issue.code === "invalid_enum_value",
        ),
      ).toBe(true);
    }
  });

  it("should reject data with non-string filter", () => {
    const invalidData = {
      filter: 12345,
      type: VehicleType.TRACKED,
    };

    const result = filterVehiclesSchema.safeParse(invalidData);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(
        result.error.issues.some(
          (issue) =>
            issue.path.includes("filter") && issue.code === "invalid_type",
        ),
      ).toBe(true);
    }
  });

  it("should handle nested validation properly", () => {
    try {
      filterVehiclesSchema.parse({
        filter: 123,
        type: "INVALID",
      });
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);

      if (error instanceof ZodError) {
        expect(error.issues.length).toBeGreaterThan(1);

        const hasFilterError = error.issues.some((issue) =>
          issue.path.includes("filter"),
        );
        const hasTypeError = error.issues.some((issue) =>
          issue.path.includes("type"),
        );

        expect(hasFilterError).toBe(true);
        expect(hasTypeError).toBe(true);
      }
    }
  });
});
