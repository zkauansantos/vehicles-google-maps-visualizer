import { renderHook } from "@testing-library/react";
import { act } from "react";

import { IVehicleTracked } from "@/entities/IVehicle";
import { useTrackedVehicles } from "@/hooks/services/vehicles/useTrackedVehicles";

import { useMapModel } from "../model";

jest.mock("@/hooks/services/vehicles/useTrackedVehicles");

describe("useMapModel", () => {
  const mockUseTrackedVehicles = useTrackedVehicles as jest.MockedFunction<
    typeof useTrackedVehicles
  >;

  beforeEach(() => {
    mockUseTrackedVehicles.mockReturnValue({
      locationsVehicles: [],
      isLoading: false,
    });
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useMapModel());

    expect(result.current.selectedVehicle).toBeNull();
    expect(result.current.locationsVehicles).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });

  it("should update selectedVehicle when onSelectVehicle is called", () => {
    const { result } = renderHook(() => useMapModel());
    const mockVehicle = { id: "1", name: "Vehicle 1" } as IVehicleTracked;

    act(() => {
      result.current.onSelectVehicle(mockVehicle);
    });

    expect(result.current.selectedVehicle).toEqual(mockVehicle);
  });

  it("should handle null value for selectedVehicle", () => {
    const { result } = renderHook(() => useMapModel());

    act(() => {
      result.current.onSelectVehicle(null);
    });

    expect(result.current.selectedVehicle).toBeNull();
  });

  it("should use tracked vehicles data from the hook", () => {
    const mockLocationsVehicles = [
      { id: "1", name: "Location 1" },
    ] as IVehicleTracked[];
    mockUseTrackedVehicles.mockReturnValue({
      locationsVehicles: mockLocationsVehicles,
      isLoading: true,
    });

    const { result } = renderHook(() => useMapModel());

    expect(result.current.locationsVehicles).toEqual(mockLocationsVehicles);
    expect(result.current.isLoading).toBe(true);
  });
});
