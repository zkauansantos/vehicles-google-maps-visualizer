import { DEFAULT_PAGINATION_LIMIT } from "@/constants/default-pagination-limit";
import { httpClient } from "@/services/httpClient";
import { formatQueryParams } from "@/utils/formatters";

import { getAllVehicles, IGetAllVehiclesParams } from "../getAll";

jest.mock("../../httpClient");
jest.mock("@/utils/formatters");

describe("getAllVehicles", () => {
  const mockedHttpClient = httpClient as jest.Mocked<typeof httpClient>;
  const mockedFormatQueryParams = formatQueryParams as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call httpClient.get with the correct URL and default parameters", async () => {
    const mockResponse = { data: { vehicles: [], total: 0 } };

    mockedHttpClient.get.mockResolvedValueOnce(mockResponse);

    mockedFormatQueryParams.mockReturnValue("?page=1&type=tracked&perPage=10");

    const result = await getAllVehicles();

    expect(mockedFormatQueryParams).toHaveBeenCalledWith({
      page: 1,
      type: "tracked",
      perPage: DEFAULT_PAGINATION_LIMIT,
    });

    expect(mockedHttpClient.get).toHaveBeenCalledWith(
      "/vehicles?page=1&type=tracked&perPage=10",
    );
    expect(result).toEqual(mockResponse.data);
  });

  it("should call httpClient.get with the correct URL and provided parameters", async () => {
    const mockResponse = { data: { vehicles: [{ id: 1 }], total: 1 } };
    mockedHttpClient.get.mockResolvedValueOnce(mockResponse);
    mockedFormatQueryParams.mockReturnValue(
      "?page=2&type=car&filter=test&perPage=10",
    );

    const filters: IGetAllVehiclesParams = {
      page: 2,
      type: "car",
      filter: "test",
    };

    const result = await getAllVehicles(filters);

    expect(mockedFormatQueryParams).toHaveBeenCalledWith({
      ...filters,
      perPage: DEFAULT_PAGINATION_LIMIT,
    });

    expect(mockedHttpClient.get).toHaveBeenCalledWith(
      "/vehicles?page=2&type=car&filter=test&perPage=10",
    );

    expect(result).toEqual(mockResponse.data);
  });

  it("should handle errors thrown by httpClient.get", async () => {
    const mockError = new Error("Network error");

    mockedHttpClient.get.mockRejectedValueOnce(mockError);

    await expect(getAllVehicles()).rejects.toThrow("Network error");
  });
});
