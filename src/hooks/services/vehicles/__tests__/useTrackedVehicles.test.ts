import { useQuery } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";

import { useTrackedVehicles } from "../useTrackedVehicles";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

jest.mock("@/services/vehicles", () => ({
  vehiclesService: {
    getAllVehicles: jest.fn(),
  },
}));

describe("useTrackedVehicles", () => {
  it("should return loading state when data is being fetched", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isFetching: false,
    });

    const { result } = renderHook(() => useTrackedVehicles());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.locationsVehicles).toEqual([]);
  });

  it("should return fetched data when query is successful", () => {
    const mockData = {
      content: {
        locationVehicles: [{ id: 1, name: "Vehicle 1" }],
      },
    };

    (useQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isFetching: false,
    });

    const { result } = renderHook(() => useTrackedVehicles());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.locationsVehicles).toEqual(
      mockData.content.locationVehicles,
    );
  });

  it("should handle empty data gracefully", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { content: { locationVehicles: [] } },
      isLoading: false,
      isFetching: false,
    });

    const { result } = renderHook(() => useTrackedVehicles());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.locationsVehicles).toEqual([]);
  });

  it("should return loading state when fetching is in progress", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isFetching: true,
    });

    const { result } = renderHook(() => useTrackedVehicles());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.locationsVehicles).toEqual([]);
  });
});
