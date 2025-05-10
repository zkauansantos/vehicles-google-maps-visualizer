"use client";

import { AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";
import Link from "next/link";

import { PinMarkerTruck } from "@/app/assets/icons/pin-marker-truck";
import type { IVehicleTracked } from "@/entities/IVehicle";
import { cn } from "@/utils/cn";
import { formatDate, formatVehiclePlate } from "@/utils/formatters";

interface IMapMarkersProps {
  points: IVehicleTracked[];
  selectedVehicle: IVehicleTracked | null;
  onSelectVehicle: (vehicle: IVehicleTracked | null) => void;
}

export function MapMarkers({
  points,
  selectedVehicle,
  onSelectVehicle,
}: IMapMarkersProps) {
  return (
    <>
      {points.map((vehicle) => (
        <AdvancedMarker
          key={vehicle.id}
          position={{ lat: vehicle.lat, lng: vehicle.lng }}
          onClick={() => {
            onSelectVehicle(selectedVehicle ? null : vehicle);
          }}
        >
          <PinMarkerTruck />
        </AdvancedMarker>
      ))}

      {selectedVehicle && (
        <InfoWindow
          className={cn(
            "bg-primary-15 text-white h-[74px] w-[166px] flex flex-col text-[10px] items-center justify-center text-center",
            "font-medium tracking-[-1%] font-secondary border rounded-lg border-primary-30 animate-in fade-in duration-1000",
          )}
          pixelOffset={[0, -65]}
          position={{ lat: selectedVehicle.lat, lng: selectedVehicle.lng }}
        >
          <p>Placa {formatVehiclePlate(selectedVehicle.plate)}</p>
          <p>Frota {selectedVehicle.fleet ?? "-"}</p>
          <p>{formatDate(selectedVehicle.createdAt)}</p>

          <Link
            className="hover:underline hover:scale-105 transition-all"
            href={`https://www.google.com/maps?q=${selectedVehicle.lat},${selectedVehicle.lng}`}
            target="_blank"
          >
            {selectedVehicle.lat} {selectedVehicle.lng}
          </Link>
        </InfoWindow>
      )}
    </>
  );
}
