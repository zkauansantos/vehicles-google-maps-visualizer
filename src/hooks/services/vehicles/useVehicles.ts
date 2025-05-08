import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { vehiclesService } from "@/services/vehicles";

export function useVehicles() {
  const searchParams = useSearchParams();

  const filters = {
    type: searchParams.get("type") ?? undefined,
    filter: searchParams.get("filter") ?? undefined,
  } as const;

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["vehicles", filters],
      initialPageParam: 1,
      queryFn: ({ pageParam }) =>
        vehiclesService.getAllVehicles({
          ...filters,
          page: pageParam,
        }),
      getNextPageParam: (lastPage, _allPages, lastPageParam) => {
        const { page, totalPages } = lastPage.content;

        const isLastPage = page === totalPages;

        if (isLastPage) {
          return null;
        }

        return lastPageParam + 1;
      },
    });

  const vehicles = data?.pages.flatMap((page) => page.content.vehicles) ?? [];

  return {
    isLoading,
    vehicles,
    nextPage: fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
}
