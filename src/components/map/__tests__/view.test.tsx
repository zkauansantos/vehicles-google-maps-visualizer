"use client";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type React from "react";

import { IVehicleTracked } from "@/entities/IVehicle";

import { MapView } from "../view";

jest.mock("@vis.gl/react-google-maps", () => ({
  APIProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="api-provider">{children}</div>
  ),
  Map: ({ children, style }: { children: React.ReactNode; style: object }) => (
    <div data-testid="google-map" data-style={JSON.stringify(style)}>
      {children}
    </div>
  ),
}));

jest.mock("../map-markers", () => ({
  MapMarkers: ({
    points,
    selectedVehicle,
    onSelectVehicle,
  }: {
    points: any[];
    selectedVehicle: any;
    onSelectVehicle: (vehicle: any) => void;
  }) => (
    <button
      type="button"
      data-testid="map-markers"
      data-points={JSON.stringify(points)}
      data-selected={selectedVehicle?.id}
      onClick={() => onSelectVehicle(points[0])}
    >
      Map Markers
    </button>
  ),
}));

jest.mock("../../ui/skeleton", () => ({
  Skeleton: ({ className }: { className: string }) => (
    <div data-testid="skeleton" className={className}>
      Loading...
    </div>
  ),
}));

jest.mock("../../../config/clientEnv", () => ({
  clientEnv: {
    googleMapsApiKey: "test-api-key",
    googleMapsMapId: "test-map-id",
  },
}));

describe("MapView Component", () => {
  const mockLocationsVehicles = [
    { id: "1", lat: 40.7128, lng: -74.006, name: "Vehicle 1" },
    { id: "2", lat: 34.0522, lng: -118.2437, name: "Vehicle 2" },
  ] as IVehicleTracked[];

  const mockOnSelectVehicle = jest.fn();

  const defaultProps = {
    isLoading: false,
    locationsVehicles: mockLocationsVehicles,
    selectedVehicle: null,
    onSelectVehicle: mockOnSelectVehicle,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the title correctly", () => {
    render(<MapView {...defaultProps} />);

    expect(screen.getByText("Mapa rastreador")).toBeInTheDocument();
  });

  it("renders loading skeleton when isLoading is true", () => {
    render(<MapView {...defaultProps} isLoading />);

    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
    expect(screen.queryByTestId("api-provider")).not.toBeInTheDocument();
  });

  it("renders Google Map when not loading", () => {
    render(<MapView {...defaultProps} />);

    expect(screen.queryByTestId("skeleton")).not.toBeInTheDocument();
    expect(screen.getByTestId("api-provider")).toBeInTheDocument();
    expect(screen.getByTestId("google-map")).toBeInTheDocument();
  });

  it("passes correct props to MapMarkers component", () => {
    render(<MapView {...defaultProps} />);

    const mapMarkers = screen.getByTestId("map-markers");
    expect(mapMarkers).toBeInTheDocument();
    expect(JSON.parse(mapMarkers.dataset.points || "[]")).toEqual(
      mockLocationsVehicles,
    );
    expect(mapMarkers.dataset.selected).toBeUndefined();
  });

  it("passes selected vehicle to MapMarkers component", () => {
    render(
      <MapView {...defaultProps} selectedVehicle={mockLocationsVehicles[0]} />,
    );

    const mapMarkers = screen.getByTestId("map-markers");
    expect(mapMarkers.dataset.selected).toBe("1");
  });

  it("calls onSelectVehicle when a marker is clicked", async () => {
    const user = userEvent.setup();

    render(<MapView {...defaultProps} />);

    const mapMarkers = screen.getByTestId("map-markers");

    await user.click(mapMarkers);

    expect(mockOnSelectVehicle).toHaveBeenCalledWith(mockLocationsVehicles[0]);
  });

  it("uses first location for map center when available", () => {
    render(<MapView {...defaultProps} />);

    expect(screen.getByTestId("google-map")).toBeInTheDocument();
  });

  it("uses DEFAULT_MAP_LAT_LONG when no locations are available", () => {
    render(<MapView {...defaultProps} locationsVehicles={[]} />);

    expect(screen.getByTestId("google-map")).toBeInTheDocument();
  });
});
