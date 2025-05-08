export interface IVehicle {
  id: string;
  plate: string;
  fleet: string | null;
  type: string;
  model: string;
  nameOwner: string;
  status: string;
  createdAt: string;
}

export interface IVehicleTracked extends IVehicle {
  equipmentId: string;
  name: string;
  ignition: string;
  lat: number;
  lng: number;
}
