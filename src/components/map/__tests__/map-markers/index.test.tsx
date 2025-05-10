import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { IVehicleTracked } from "@/entities/IVehicle";

import { MapMarkers } from "../../map-markers";

jest.mock("@vis.gl/react-google-maps", () => ({
  AdvancedMarker: ({ children, position, onClick }: any) => (
    <button
      type="button"
      data-testid="advanced-marker"
      data-lat={position.lat}
      data-lng={position.lng}
      onClick={onClick}
    >
      {children}
    </button>
  ),
  InfoWindow: ({ children, position, pixelOffset, className }: any) => (
    <div
      data-testid="info-window"
      data-lat={position.lat}
      data-lng={position.lng}
      data-pixel-offset={JSON.stringify(pixelOffset)}
      className={className}
    >
      {children}
    </div>
  ),
}));

jest.mock("../../../../assets/icons/pin-marker-truck", () => ({
  PinMarkerTruck: () => <div data-testid="pin-marker-truck">🚚</div>,
}));

jest.mock("@/utils/formatters", () => ({
  formatVehiclePlate: (plate: string) => `FORMATTED-${plate}`,
  formatDate: (date: string) => date.toString(),
}));

describe("MapMarkers Component", () => {
  const mockVehicles = [
    {
      id: "1",
      lat: 40.7128,
      lng: -74.006,
      plate: "ABC1234",
      fleet: "Fleet A",
      createdAt: new Date("2023-01-01T12:00:00Z"),
    },
    {
      id: "2",
      lat: 34.0522,
      lng: -118.2437,
      plate: "XYZ5678",
      fleet: "Fleet B",
      createdAt: new Date("2023-01-02T12:00:00Z"),
    },
  ] as unknown as IVehicleTracked[];

  const mockOnSelectVehicle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders markers for each vehicle", () => {
    render(
      <MapMarkers
        points={mockVehicles}
        selectedVehicle={null}
        onSelectVehicle={mockOnSelectVehicle}
      />,
    );

    const markers = screen.getAllByTestId("advanced-marker");
    expect(markers).toHaveLength(2);

    expect(markers[0]).toHaveAttribute("data-lat", "40.7128");
    expect(markers[0]).toHaveAttribute("data-lng", "-74.006");

    expect(markers[1]).toHaveAttribute("data-lat", "34.0522");
    expect(markers[1]).toHaveAttribute("data-lng", "-118.2437");
  });

  it("renders truck icon for each marker", () => {
    render(
      <MapMarkers
        points={mockVehicles}
        selectedVehicle={null}
        onSelectVehicle={mockOnSelectVehicle}
      />,
    );

    const truckIcons = screen.getAllByTestId("pin-marker-truck");
    expect(truckIcons).toHaveLength(2);
  });

  it("does not render InfoWindow when no vehicle is selected", () => {
    render(
      <MapMarkers
        points={mockVehicles}
        selectedVehicle={null}
        onSelectVehicle={mockOnSelectVehicle}
      />,
    );

    expect(screen.queryByTestId("info-window")).not.toBeInTheDocument();
  });

  it("renders InfoWindow when a vehicle is selected", () => {
    render(
      <MapMarkers
        points={mockVehicles}
        selectedVehicle={mockVehicles[0]}
        onSelectVehicle={mockOnSelectVehicle}
      />,
    );

    const infoWindow = screen.getByTestId("info-window");
    expect(infoWindow).toBeInTheDocument();
    expect(infoWindow).toHaveAttribute("data-lat", "40.7128");
    expect(infoWindow).toHaveAttribute("data-lng", "-74.006");
  });

  it("InfoWindow displays formatted vehicle information", () => {
    render(
      <MapMarkers
        points={mockVehicles}
        selectedVehicle={mockVehicles[0]}
        onSelectVehicle={mockOnSelectVehicle}
      />,
    );

    expect(screen.getByText("Placa FORMATTED-ABC1234")).toBeInTheDocument();

    expect(screen.getByText("Frota Fleet A")).toBeInTheDocument();

    const coordsLink = screen.getByText("40.7128 -74.006");
    expect(coordsLink).toBeInTheDocument();
    expect(coordsLink.closest("a")).toHaveAttribute(
      "href",
      "https://www.google.com/maps?q=40.7128,-74.006",
    );
  });

  it("InfoWindow displays dash when fleet is missing", () => {
    const vehicleWithoutFleet = {
      ...mockVehicles[0],
      fleet: null,
    };

    render(
      <MapMarkers
        points={mockVehicles}
        selectedVehicle={vehicleWithoutFleet}
        onSelectVehicle={mockOnSelectVehicle}
      />,
    );

    expect(screen.getByText("Frota -")).toBeInTheDocument();
  });

  it("calls onSelectVehicle with vehicle when marker is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MapMarkers
        points={mockVehicles}
        selectedVehicle={null}
        onSelectVehicle={mockOnSelectVehicle}
      />,
    );

    const markers = screen.getAllByTestId("advanced-marker");
    await user.click(markers[0]);

    expect(mockOnSelectVehicle).toHaveBeenCalledWith(mockVehicles[0]);
  });

  it("calls onSelectVehicle with null when marker is clicked and vehicle is already selected", async () => {
    const user = userEvent.setup();
    render(
      <MapMarkers
        points={mockVehicles}
        selectedVehicle={mockVehicles[0]}
        onSelectVehicle={mockOnSelectVehicle}
      />,
    );

    const markers = screen.getAllByTestId("advanced-marker");
    await user.click(markers[0]);

    expect(mockOnSelectVehicle).toHaveBeenCalledWith(null);
  });

  it("InfoWindow has correct pixel offset", () => {
    render(
      <MapMarkers
        points={mockVehicles}
        selectedVehicle={mockVehicles[0]}
        onSelectVehicle={mockOnSelectVehicle}
      />,
    );

    const infoWindow = screen.getByTestId("info-window");
    expect(infoWindow).toHaveAttribute(
      "data-pixel-offset",
      JSON.stringify([0, -65]),
    );
  });

  it("InfoWindow has correct styling classes", () => {
    render(
      <MapMarkers
        points={mockVehicles}
        selectedVehicle={mockVehicles[0]}
        onSelectVehicle={mockOnSelectVehicle}
      />,
    );

    const infoWindow = screen.getByTestId("info-window");
    expect(infoWindow.className).toContain("bg-primary-15");
    expect(infoWindow.className).toContain("text-white");
    expect(infoWindow.className).toContain("animate-in");
  });
});
