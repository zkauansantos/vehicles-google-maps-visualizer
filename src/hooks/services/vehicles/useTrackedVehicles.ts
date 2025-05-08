import { useQuery } from "@tanstack/react-query";

import { vehiclesService } from "@/services/vehicles";

export function useTrackedVehicles() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["tracked-vehicles"],
    queryFn: () => vehiclesService.getAllVehicles(),
    refetchInterval: 120000,
  });

  return {
    isLoading: isLoading || isFetching,
    locationsVehicles: data?.content.locationVehicles ?? [],
  };
}
