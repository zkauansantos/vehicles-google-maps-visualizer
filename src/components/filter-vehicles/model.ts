"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

import { formatQueryParams } from "@/utils/formatters";

import { FilterVehiclesFormData, filterVehiclesSchema } from "./schema";
import { VehicleType } from "./types";

export function useFilterVehiclesModel() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const getSearchParams = useCallback(
    () => ({
      type: (searchParams.get("type") as VehicleType) ?? VehicleType.TRACKED,
      filter: searchParams.get("filter") ?? "",
    }),
    [searchParams],
  );

  const { control, register, handleSubmit, watch } =
    useForm<FilterVehiclesFormData>({
      resolver: zodResolver(filterVehiclesSchema),
      defaultValues: {
        type: getSearchParams().type,
        filter: getSearchParams().filter,
      },
    });

  useEffect(() => {
    const { unsubscribe } = watch((fieldValues, { name }) => {
      const oldType = getSearchParams().type;
      const newType = fieldValues.type;
      const isTypeFilter = name === "type" && newType !== oldType;

      if (isTypeFilter) {
        const params = formatQueryParams({
          filter: getSearchParams().filter,
          type: newType,
        });

        router.replace(`${params}`);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [watch, router, getSearchParams]);

  const onSubmit = handleSubmit((data) => {
    const params = formatQueryParams({
      filter: data.filter,
      type: getSearchParams().type,
    });

    router.replace(`${params}`);
  });

  return {
    control,
    register,
    onSubmit,
  };
}
