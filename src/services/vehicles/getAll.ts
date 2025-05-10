import { IGetAllVehiclesResponse } from "@/app/api/vehicles/types";
import { DEFAULT_PAGINATION_LIMIT } from "@/constants/default-pagination-limit";
import { formatQueryParams } from "@/utils/formatters";

import { httpClient } from "../httpClient";

export interface IGetAllVehiclesParams {
  page?: number;
  type?: string;
  filter?: string;
}

export async function getAllVehicles(filters?: IGetAllVehiclesParams) {
  const params = formatQueryParams({
    ...filters,
    page: filters?.page ?? 1,
    type: filters?.type ?? "tracked",
    perPage: DEFAULT_PAGINATION_LIMIT,
  });

  const { data } = await httpClient.get<IGetAllVehiclesResponse>(
    `/vehicles${params}`,
  );

  return data;
}
