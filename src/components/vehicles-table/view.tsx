"use client";

import { Loader2Icon } from "lucide-react";

import { cn } from "@/utils/cn";
import { formatVehiclePlate } from "@/utils/formatters";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { useVehiclesTableModel } from "./model";

type VehiclesTableViewProps = ReturnType<typeof useVehiclesTableModel>;

export function VehiclesTableView({
  isFetchingNextPage,
  ref,
  vehicles,
}: VehiclesTableViewProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Placa</TableHead>
            <TableHead>Frota</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell className="font-medium">
                {formatVehiclePlate(vehicle.plate)}
              </TableCell>
              <TableCell>{vehicle.fleet || "—"}</TableCell>
              <TableCell className="capitalize">{vehicle.type}</TableCell>
              <TableCell>{vehicle.model}</TableCell>
              <TableCell>{vehicle.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div
        ref={ref}
        className={cn(
          !isFetchingNextPage && "opacity-0",
          isFetchingNextPage &&
            "opacity-100 border border-primary-30 bg-primary-15 mx-auto mb-4 px-3 py-2 rounded-lg text-neutral-dark flex items-center gap-2",
        )}
      >
        <Loader2Icon className="animate-spin" />
      </div>
    </div>
  );
}
