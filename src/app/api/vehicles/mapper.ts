/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGetAllVehiclesResponse } from "./types";

export class VehiclesMapper {
  static toDomain(response: IGetAllVehiclesResponse): IGetAllVehiclesResponse {
    const vehicles = this.removeDuplicatesByKey(
      response.content.vehicles,
      "id",
    );
    const locationVehicles = this.removeDuplicatesByKey(
      response.content.locationVehicles,
      "id",
    );

    return {
      ...response,
      content: {
        ...response.content,
        vehicles,
        locationVehicles,
      },
    };
  }

  private static removeDuplicatesByKey<T extends Record<string, any>>(
    array: T[],
    key: keyof T,
  ): T[] {
    const seen = new Map<any, T>();

    array.forEach((item) => {
      const value = item[key];
      if (!seen.has(value)) {
        seen.set(value, item);
      }
    });

    return Array.from(seen.values());
  }
}
