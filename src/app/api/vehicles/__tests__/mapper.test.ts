import { IVehicle, IVehicleTracked } from "@/entities/IVehicle";
import { IGetAllVehiclesResponse } from "@/interfaces/api.response";

import { VehiclesMapper } from "../mapper";

describe("VehiclesMapper", () => {
  const baseResponse = {
    message: "Success",
    statusCode: 200,
    content: {
      totalPages: 1,
      page: 1,
      perPage: 20,
    },
  };

  describe("toDomain", () => {
    it("should remove duplicate vehicles and locationVehicles by id", () => {
      const response: IGetAllVehiclesResponse = {
        ...baseResponse,
        content: {
          ...baseResponse.content,
          vehicles: [
            { id: "1" },
            { id: "2" },
            { id: "1" }, // duplicate
          ] as IVehicle[],
          locationVehicles: [
            { id: "1" },
            { id: "2" },
            { id: "1" }, // duplicate
          ] as IVehicleTracked[],
        },
      };

      const result = VehiclesMapper.toDomain(response);

      expect(result.content.vehicles).toEqual([{ id: "1" }, { id: "2" }]);
      expect(result.content.locationVehicles).toEqual([
        { id: "1" },
        { id: "2" },
      ]);
    });

    it("should return the same response if there are no duplicates", () => {
      const response: IGetAllVehiclesResponse = {
        ...baseResponse,
        content: {
          ...baseResponse.content,
          vehicles: [{ id: "1" }, { id: "2" }] as IVehicle[],
          locationVehicles: [{ id: "1" }, { id: "2" }] as IVehicleTracked[],
        },
      };

      const result = VehiclesMapper.toDomain(response);

      expect(result).toEqual(response);
    });

    it("should handle empty arrays gracefully", () => {
      const response: IGetAllVehiclesResponse = {
        ...baseResponse,
        content: {
          ...baseResponse.content,
          vehicles: [],
          locationVehicles: [],
        },
      };

      const result = VehiclesMapper.toDomain(response);

      expect(result.content.vehicles).toEqual([]);
      expect(result.content.locationVehicles).toEqual([]);
    });
  });
});
