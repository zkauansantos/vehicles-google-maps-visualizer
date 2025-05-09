import { useVehicles } from "@/hooks/services/vehicles/useVehicles";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export function useVehiclesTableModel() {
  const { vehicles, nextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useVehicles();

  const { ref } = useIntersectionObserver({
    callback: nextPage,
    condition: hasNextPage,
    isToDisconnect: !hasNextPage,
  });

  return {
    vehicles,
    ref,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
  };
}
