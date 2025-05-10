import { renderHook } from "@testing-library/react";

import { useVehicles } from "@/hooks/services/vehicles/useVehicles";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

import { useVehiclesTableModel } from "../model";

jest.mock("@/hooks/services/vehicles/useVehicles");
jest.mock("@/hooks/useIntersectionObserver");

describe("useVehiclesTableModel", () => {
  it("should return the correct values from useVehicles and useIntersectionObserver", () => {
    const mockVehicles = [
      { id: 1, name: "Car 1" },
      { id: 2, name: "Car 2" },
    ];
    const mockNextPage = jest.fn();
    const mockHasNextPage = true;
    const mockIsLoading = false;
    const mockIsFetchingNextPage = false;
    const mockRef = jest.fn();

    (useVehicles as jest.Mock).mockReturnValue({
      vehicles: mockVehicles,
      nextPage: mockNextPage,
      hasNextPage: mockHasNextPage,
      isLoading: mockIsLoading,
      isFetchingNextPage: mockIsFetchingNextPage,
    });

    (useIntersectionObserver as jest.Mock).mockReturnValue({
      ref: mockRef,
    });

    const { result } = renderHook(() => useVehiclesTableModel());

    expect(result.current.vehicles).toEqual(mockVehicles);
    expect(result.current.ref).toBe(mockRef);
    expect(result.current.isLoading).toBe(mockIsLoading);
    expect(result.current.isFetchingNextPage).toBe(mockIsFetchingNextPage);
    expect(result.current.hasNextPage).toBe(mockHasNextPage);
  });

  it("should call nextPage when the intersection observer callback is triggered", () => {
    const mockNextPage = jest.fn();
    const mockHasNextPage = true;

    (useVehicles as jest.Mock).mockReturnValue({
      vehicles: [],
      nextPage: mockNextPage,
      hasNextPage: mockHasNextPage,
      isLoading: false,
      isFetchingNextPage: false,
    });

    (useIntersectionObserver as jest.Mock).mockImplementation(
      ({ callback }) => {
        callback();
        return { ref: jest.fn() };
      },
    );

    renderHook(() => useVehiclesTableModel());

    expect(mockNextPage).toHaveBeenCalled();
  });
});
