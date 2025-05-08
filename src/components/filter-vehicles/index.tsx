"use client";

import { useFilterVehiclesModel } from "./model";
import { FilterVehiclesView } from "./view";

export function FilterVehicles() {
  const methods = useFilterVehiclesModel();

  return <FilterVehiclesView {...methods} />;
}
