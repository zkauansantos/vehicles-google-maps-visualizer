"use client";

import { useMapModel } from "./model";
import { MapView } from "./view";

export function Map() {
  const methods = useMapModel();

  return <MapView {...methods} />;
}
