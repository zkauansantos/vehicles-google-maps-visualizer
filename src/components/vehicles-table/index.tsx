"use client";

import { useVehiclesTableModel } from "./model";
import { VehiclesTableView } from "./view";

export function VehiclesTable() {
  const methods = useVehiclesTableModel();

  return <VehiclesTableView {...methods} />;
}
