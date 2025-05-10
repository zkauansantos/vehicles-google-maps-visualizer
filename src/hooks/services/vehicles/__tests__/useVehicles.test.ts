import { useInfiniteQuery } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import { useSearchParams } from "next/navigation";

import { vehiclesService } from "@/services/vehicles";

import { useVehicles } from "../useVehicles";

jest.mock("@tanstack/react-query", () => ({
  useInfiniteQuery: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

jest.mock("@/services/vehicles", () => ({
  vehiclesService: {
    getAllVehicles: jest.fn(),
  },
}));

const mockSearchParams = new Map<string, string>();

const mockUseSearchParams = () => ({
  get: (key: string) => mockSearchParams.get(key) || null,
});

describe("useVehicles", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockSearchParams.clear();

    (useSearchParams as jest.Mock).mockImplementation(mockUseSearchParams);
  });

  it("should return loading state initially", () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    const { result } = renderHook(() => useVehicles());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.vehicles).toEqual([]);
    expect(result.current.hasNextPage).toBe(false);
    expect(result.current.isFetchingNextPage).toBe(false);
  });

  it("should fetch vehicles with no filters when URL has no params", () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            content: {
              vehicles: [
                { id: 1, name: "Car 1" },
                { id: 2, name: "Car 2" },
              ],
              page: 1,
              totalPages: 2,
            },
          },
        ],
      },
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    const { result } = renderHook(() => useVehicles());

    expect(useInfiniteQuery).toHaveBeenCalledWith({
      queryKey: ["vehicles", { type: undefined, filter: undefined }],
      initialPageParam: 1,
      queryFn: expect.any(Function),
      getNextPageParam: expect.any(Function),
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.vehicles).toEqual([
      { id: 1, name: "Car 1" },
      { id: 2, name: "Car 2" },
    ]);
    expect(result.current.hasNextPage).toBe(true);
  });

  it("should fetch vehicles with filters when URL has params", () => {
    mockSearchParams.set("type", "car");
    mockSearchParams.set("filter", "new");

    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            content: {
              vehicles: [{ id: 1, name: "New Car" }],
              page: 1,
              totalPages: 1,
            },
          },
        ],
      },
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    const { result } = renderHook(() => useVehicles());

    expect(useInfiniteQuery).toHaveBeenCalledWith({
      queryKey: ["vehicles", { type: "car", filter: "new" }],
      initialPageParam: 1,
      queryFn: expect.any(Function),
      getNextPageParam: expect.any(Function),
    });

    expect(result.current.vehicles).toEqual([{ id: 1, name: "New Car" }]);
    expect(result.current.hasNextPage).toBe(false);
  });

  it("should correctly call queryFn with filters and page", async () => {
    mockSearchParams.set("type", "truck");

    const mockGetAllVehicles = vehiclesService.getAllVehicles as jest.Mock;

    mockGetAllVehicles.mockResolvedValue({
      content: {
        vehicles: [{ id: 3, name: "Truck" }],
        page: 1,
        totalPages: 1,
      },
    });

    let capturedQueryFn: Function = () => {};

    (useInfiniteQuery as jest.Mock).mockImplementation((options) => {
      capturedQueryFn = options.queryFn;

      return {
        data: undefined,
        isLoading: true,
        fetchNextPage: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
      };
    });

    renderHook(() => useVehicles());

    expect(capturedQueryFn).not.toBeNull();

    if (capturedQueryFn) {
      await capturedQueryFn({ pageParam: 2 });
    }

    expect(mockGetAllVehicles).toHaveBeenCalledWith({
      type: "truck",
      filter: undefined,
      page: 2,
    });
  });

  it("should correctly determine if there is a next page", () => {
    let capturedGetNextPageParam: Function = () => {};

    (useInfiniteQuery as jest.Mock).mockImplementation((options) => {
      capturedGetNextPageParam = options.getNextPageParam;
      return {
        data: undefined,
        isLoading: false,
        fetchNextPage: jest.fn(),
        hasNextPage: false,
        isFetchingNextPage: false,
      };
    });

    renderHook(() => useVehicles());

    expect(capturedGetNextPageParam).not.toBeNull();

    if (capturedGetNextPageParam) {
      const result1 = capturedGetNextPageParam(
        { content: { page: 1, totalPages: 3, vehicles: [] } },
        [],
        1,
      );

      expect(result1).toBe(2);

      const result2 = capturedGetNextPageParam(
        { content: { page: 3, totalPages: 3, vehicles: [] } },
        [],
        3,
      );
      expect(result2).toBeNull();
    }
  });

  it("should flatten vehicles from multiple pages", () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            content: {
              vehicles: [
                { id: 1, name: "Car 1" },
                { id: 2, name: "Car 2" },
              ],
              page: 1,
              totalPages: 2,
            },
          },
          {
            content: {
              vehicles: [
                { id: 3, name: "Car 3" },
                { id: 4, name: "Car 4" },
              ],
              page: 2,
              totalPages: 2,
            },
          },
        ],
      },
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    const { result } = renderHook(() => useVehicles());

    expect(result.current.vehicles).toEqual([
      { id: 1, name: "Car 1" },
      { id: 2, name: "Car 2" },
      { id: 3, name: "Car 3" },
      { id: 4, name: "Car 4" },
    ]);
  });

  it("should return empty array when data is undefined", () => {
    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    const { result } = renderHook(() => useVehicles());

    expect(result.current.vehicles).toEqual([]);
  });

  it("should return pagination functions from useInfiniteQuery", () => {
    const mockFetchNextPage = jest.fn();

    (useInfiniteQuery as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            content: {
              vehicles: [{ id: 1, name: "Car 1" }],
              page: 1,
              totalPages: 2,
            },
          },
        ],
      },
      isLoading: false,
      fetchNextPage: mockFetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    const { result } = renderHook(() => useVehicles());

    result.current.nextPage();

    expect(mockFetchNextPage).toHaveBeenCalledTimes(1);
  });
});
