import { IVehicle, IVehicleTracked } from "@/entities/IVehicle";

export interface IGetAllVehiclesResponse {
  statusCode: number;
  message: string;
  content: {
    vehicles: IVehicle[];
    locationVehicles: IVehicleTracked[];
    totalPages: number;
    page: number;
    perPage: number;
  };
}
