import { act, renderHook } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";
import { BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";

import { formatQueryParams } from "@/utils/formatters";

import { useFilterVehiclesModel } from "../model";
import { FilterVehiclesFormData } from "../schema";
import { VehicleType } from "../types";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  useForm: jest.fn(),
}));

jest.mock("@/utils/formatters", () => ({
  formatQueryParams: jest.fn(),
}));

describe("useFilterVehiclesModel", () => {
  const mockReplace = jest.fn();
  const mockRouter = { replace: mockReplace };
  const mockWatch = jest.fn();
  const mockHandleSubmit = jest.fn(
    (callback) => (data: FilterVehiclesFormData) => callback(data),
  );
  const mockUnsubscribe = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    (useForm as jest.Mock).mockReturnValue({
      control: "mockControl",
      register: "mockRegister",
      handleSubmit: mockHandleSubmit,
      watch: mockWatch,
    });

    mockWatch.mockReturnValue({ unsubscribe: mockUnsubscribe });

    (formatQueryParams as jest.Mock).mockImplementation(
      (params) => `?${new URLSearchParams(params).toString()}`,
    );
  });

  it("should initialize with default values from search params", () => {
    const mockSearchParams = new Map([
      ["type", VehicleType.TRACKED],
      ["filter", "test-filter"],
    ]);

    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => mockSearchParams.get(key),
    });

    renderHook(() => useFilterVehiclesModel());

    expect(useForm).toHaveBeenCalledWith({
      resolver: expect.any(Function),
      defaultValues: {
        type: VehicleType.TRACKED,
        filter: "test-filter",
      },
    });
  });

  it("should initialize with fallback values when search params are empty", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => null,
    });

    renderHook(() => useFilterVehiclesModel());

    expect(useForm).toHaveBeenCalledWith({
      resolver: expect.any(Function),
      defaultValues: {
        type: VehicleType.TRACKED,
        filter: "",
      },
    });
  });

  it("should set up watch in useEffect for form changes", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => null,
    });

    renderHook(() => useFilterVehiclesModel());

    expect(mockWatch).toHaveBeenCalled();
  });

  it("should update URL when type changes in the form", () => {
    const mockSearchParams = new Map([
      ["type", VehicleType.TRACKED],
      ["filter", "test-filter"],
    ]);

    const newFilterParams = "?filter=test-filter&type=OTHERS";

    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => mockSearchParams.get(key),
    });

    (formatQueryParams as jest.Mock).mockReturnValue(newFilterParams);

    renderHook(() => useFilterVehiclesModel());

    const watchCallback = mockWatch.mock.calls[0][0];

    act(() => {
      watchCallback(
        { type: VehicleType.OTHERS, filter: "test-filter" },
        { name: "type" },
      );
    });

    expect(formatQueryParams).toHaveBeenCalledWith({
      filter: "test-filter",
      type: VehicleType.OTHERS,
    });

    expect(mockReplace).toHaveBeenCalledWith(newFilterParams);
  });

  it("should not update URL when type doesn't change", () => {
    const mockSearchParams = new Map([
      ["type", VehicleType.TRACKED],
      ["filter", "test-filter"],
    ]);

    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => mockSearchParams.get(key),
    });

    renderHook(() => useFilterVehiclesModel());

    const watchCallback = mockWatch.mock.calls[0][0];

    act(() => {
      watchCallback(
        { type: VehicleType.TRACKED, filter: "new-filter" },
        { name: "filter" },
      );
    });

    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("should unsubscribe from watch on unmount", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => null,
    });

    const { unmount } = renderHook(() => useFilterVehiclesModel());

    unmount();

    expect(mockUnsubscribe).toHaveBeenCalled();
  });

  it("should handle form submission with filter value", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => (key === "type" ? VehicleType.TRACKED : ""),
    });

    const newFilterParams = "?filter=new-filter&type=TRACKED";

    (formatQueryParams as jest.Mock).mockReturnValue(newFilterParams);

    const { result } = renderHook(() => useFilterVehiclesModel());

    act(() => {
      const values = {
        filter: "new-filter",
        type: VehicleType.TRACKED,
      } as unknown as BaseSyntheticEvent;

      result.current.onSubmit(values);
    });

    expect(formatQueryParams).toHaveBeenCalledWith({
      filter: "new-filter",
      type: VehicleType.TRACKED,
    });

    expect(mockReplace).toHaveBeenCalledWith(newFilterParams);
  });

  it("should return control, register, and onSubmit", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => null,
    });

    const { result } = renderHook(() => useFilterVehiclesModel());

    expect(result.current).toEqual({
      control: "mockControl",
      register: "mockRegister",
      onSubmit: expect.any(Function),
    });
  });
});
