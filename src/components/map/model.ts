import { useState } from "react";

import { IVehicleTracked } from "@/entities/IVehicle";
import { useTrackedVehicles } from "@/hooks/services/vehicles/useTrackedVehicles";

type SelectedVehicle = IVehicleTracked | null;

export function useMapModel() {
  const [selectedVehicle, setSelectedVehicle] = useState<SelectedVehicle>(null);
  const { locationsVehicles, isLoading } = useTrackedVehicles();

  function handleSelectVehicle(vehicle: SelectedVehicle) {
    setSelectedVehicle(vehicle);
  }

  return {
    selectedVehicle,
    onSelectVehicle: handleSelectVehicle,
    locationsVehicles,
    isLoading,
  };
}
