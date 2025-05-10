import { NextRequest, NextResponse } from "next/server";

import { IGetAllVehiclesResponse } from "@/interfaces/api.response";
import { httpServer } from "@/services/httpServer";
import { formatQueryParams } from "@/utils/formatters";

import { VehiclesMapper } from "./mapper";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const params = formatQueryParams({
    page: searchParams.get("page"),
    filter: searchParams.get("filter"),
    type: searchParams.get("type"),
    perPage: searchParams.get("perPage"),
  });

  try {
    const response = await httpServer.get<IGetAllVehiclesResponse>(
      `/recruitment/vehicles/list-with-paginate${params}`,
    );

    const data = VehiclesMapper.toDomain(response.data);

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { statusCode: 400, message: "Error fetching vehicles" },
      { status: 400 },
    );
  }
}
