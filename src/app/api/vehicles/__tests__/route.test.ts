import { NextRequest } from "next/server";

import { IVehicle, IVehicleTracked } from "@/entities/IVehicle";
import { httpServer } from "@/services/httpServer";
import { formatQueryParams } from "@/utils/formatters";

import { VehiclesMapper } from "../mapper";
import { GET } from "../route";

jest.mock("@/services/httpServer", () => ({
  httpServer: {
    get: jest.fn(),
  },
}));

jest.mock("@/utils/formatters", () => ({
  formatQueryParams: jest.fn(),
}));

jest.mock("../mapper", () => ({
  VehiclesMapper: {
    toDomain: jest.fn(),
  },
}));

jest.mock("next/server", () => {
  const originalModule = jest.requireActual("next/server");

  class MockNextRequest {
    nextUrl: URL;

    constructor(url: string | URL) {
      this.nextUrl = url instanceof URL ? url : new URL(url);
    }
  }

  return {
    ...originalModule,
    NextRequest: MockNextRequest,
    NextResponse: {
      json: jest.fn((data, options) => ({
        status: options?.status || 200,
        json: async () => data,
      })),
    },
  };
});

describe("Vehicles Route Handler", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return vehicles data with status 200 on successful request", async () => {
    const mockUrl = new URL(
      "http://localhost:3000/api/vehicles?page=1&filter=brand&type=car&perPage=10",
    );
    const mockRequest = new NextRequest(mockUrl);
    const mockFormattedParams = "?page=1&filter=brand&type=car&perPage=10";

    const mockApiResponse = {
      data: {
        statusCode: 200,
        message: "Success",
        content: {
          page: 1,
          perPage: 20,
          locationVehicles: [
            { id: "1", name: "Owner 1" },
            { id: "2", name: "Owner 2" },
          ] as IVehicleTracked[],
          totalPages: 1,
          vehicles: [
            {
              id: "1",
              name: "Vehicle 1",
            },
          ] as unknown as IVehicle[],
        },
      },
    };

    (formatQueryParams as jest.Mock).mockReturnValue(mockFormattedParams);
    (httpServer.get as jest.Mock).mockResolvedValue(mockApiResponse);
    (VehiclesMapper.toDomain as jest.Mock).mockReturnValue(mockApiResponse);

    const response = await GET(mockRequest);
    const responseData = await response.json();

    expect(formatQueryParams).toHaveBeenCalledWith({
      page: "1",
      filter: "brand",
      type: "car",
      perPage: "10",
    });
    expect(httpServer.get).toHaveBeenCalledWith(
      `/recruitment/vehicles/list-with-paginate${mockFormattedParams}`,
    );
    expect(VehiclesMapper.toDomain).toHaveBeenCalledWith(mockApiResponse.data);
    expect(response.status).toBe(200);
    expect(responseData).toEqual(mockApiResponse);
  });

  it("should return error response with status 400 when API request fails", async () => {
    const mockUrl = new URL("http://localhost:3000/api/vehicles?page=1");
    const mockRequest = new NextRequest(mockUrl);

    const mockFormattedParams = "?page=1";

    (formatQueryParams as jest.Mock).mockReturnValue(mockFormattedParams);
    (httpServer.get as jest.Mock).mockRejectedValue(new Error("API Error"));

    const response = await GET(mockRequest);
    const responseData = await response.json();

    expect(formatQueryParams).toHaveBeenCalledWith({
      page: "1",
      filter: null,
      type: null,
      perPage: null,
    });
    expect(httpServer.get).toHaveBeenCalledWith(
      `/recruitment/vehicles/list-with-paginate${mockFormattedParams}`,
    );
    expect(VehiclesMapper.toDomain).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(responseData).toEqual({
      statusCode: 400,
      message: "Error fetching vehicles",
    });
  });

  it("should handle empty search params", async () => {
    const mockUrl = new URL("http://localhost:3000/api/vehicles");

    const mockRequest = new NextRequest(mockUrl);

    const mockFormattedParams = "";

    const mockApiResponse = {
      data: {
        statusCode: 200,
        message: "Success",
        content: {
          page: 1,
          perPage: 20,
          locationVehicles: [],
          totalPages: 1,
          vehicles: [],
        },
      },
    };

    (formatQueryParams as jest.Mock).mockReturnValue(mockFormattedParams);
    (httpServer.get as jest.Mock).mockResolvedValue(mockApiResponse);
    (VehiclesMapper.toDomain as jest.Mock).mockReturnValue(mockApiResponse);

    const response = await GET(mockRequest);
    const responseData = await response.json();

    expect(formatQueryParams).toHaveBeenCalledWith({
      page: null,
      filter: null,
      type: null,
      perPage: null,
    });

    expect(httpServer.get).toHaveBeenCalledWith(
      `/recruitment/vehicles/list-with-paginate${mockFormattedParams}`,
    );
    expect(VehiclesMapper.toDomain).toHaveBeenCalledWith(mockApiResponse.data);
    expect(response.status).toBe(200);
    expect(responseData).toEqual(mockApiResponse);
  });
});
