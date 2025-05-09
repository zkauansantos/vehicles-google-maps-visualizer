import { APIProvider, Map as GoogleMap } from "@vis.gl/react-google-maps";

import { clientEnv } from "@/config/clientEnv";
import { DEFAULT_MAP_LAT_LONG } from "@/constants/default-map-lat-long";
import { mapStyle } from "@/styles/mapStyle";

import { Skeleton } from "../ui/skeleton";

import { MapMarkers } from "./map-markers";
import { useMapModel } from "./model";

type MapViewProps = ReturnType<typeof useMapModel>;

export function MapView({
  isLoading,
  locationsVehicles,
  selectedVehicle,
  onSelectVehicle,
}: MapViewProps) {
  return (
    <aside className="max-h-[589px] border flex flex-col gap-4 border-primary-30 rounded-2xl p-4">
      <h2 className="text-white ml-1 font-semibold">Mapa rastreador</h2>

      {isLoading && <Skeleton className="h-[518px] w-full rounded-2xl" />}

      {!isLoading && (
        <APIProvider apiKey={clientEnv.googleMapsApiKey}>
          <GoogleMap
            mapId={clientEnv.googleMapsMapId}
            style={mapStyle}
            defaultCenter={{
              lat: locationsVehicles[0]?.lat || DEFAULT_MAP_LAT_LONG.lat,
              lng: locationsVehicles[0]?.lng || DEFAULT_MAP_LAT_LONG.lng,
            }}
            defaultZoom={15}
            keyboardShortcuts={false}
            cameraControl={false}
            disableDefaultUI
          >
            <MapMarkers
              points={locationsVehicles}
              selectedVehicle={selectedVehicle}
              onSelectVehicle={onSelectVehicle}
            />
          </GoogleMap>
        </APIProvider>
      )}
    </aside>
  );
}
