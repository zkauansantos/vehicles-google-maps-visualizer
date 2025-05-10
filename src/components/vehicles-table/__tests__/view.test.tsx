import { render, screen } from "@testing-library/react";

import { IVehicle } from "@/entities/IVehicle";

import { VehiclesTableView } from "../view";

jest.mock("../skeleton", () => ({
  VehiclesTableSkeleton: jest.fn(() => <div data-testid="skeleton" />),
}));

jest.mock("@/utils/formatters", () => ({
  formatVehiclePlate: jest.fn((plate) => plate),
}));

jest.mock("@/utils/cn", () => ({
  cn: jest.fn((...classes) => classes.join(" ")),
}));

describe("VehiclesTableView", () => {
  const mockRef = {} as any;

  const mockVehicles = [
    {
      id: "1",
      plate: "ABC1234",
      fleet: "Fleet A",
      type: "car",
      model: "Model X",
      status: "active",
    },
    {
      id: "2",
      plate: "XYZ5678",
      fleet: null,
      type: "truck",
      model: "Model Y",
      status: "inactive",
    },
  ] as IVehicle[];

  it("renders the skeleton when loading", () => {
    render(
      <VehiclesTableView
        isFetchingNextPage={false}
        ref={mockRef}
        isLoading
        hasNextPage={false}
        vehicles={[]}
      />,
    );

    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("renders the table with vehicle data", () => {
    render(
      <VehiclesTableView
        isFetchingNextPage={false}
        ref={mockRef}
        isLoading={false}
        hasNextPage={false}
        vehicles={mockVehicles}
      />,
    );

    expect(screen.getByText("Placa")).toBeInTheDocument();
    expect(screen.getByText("Frota")).toBeInTheDocument();
    expect(screen.getByText("Tipo")).toBeInTheDocument();
    expect(screen.getByText("Modelo")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();

    mockVehicles.forEach((vehicle) => {
      expect(screen.getByText(vehicle.plate)).toBeInTheDocument();
      expect(screen.getByText(vehicle.fleet || "—")).toBeInTheDocument();
      expect(screen.getByText(vehicle.type)).toBeInTheDocument();
      expect(screen.getByText(vehicle.model)).toBeInTheDocument();
      expect(screen.getByText(vehicle.status)).toBeInTheDocument();
    });
  });

  it("renders the loading indicator when fetching next page", () => {
    render(
      <VehiclesTableView
        isFetchingNextPage
        ref={mockRef}
        isLoading={false}
        vehicles={mockVehicles}
        hasNextPage
      />,
    );

    expect(screen.getByTestId(/loading-icon/i)).toBeInTheDocument();
    expect(mockRef).toBeDefined();
  });

  it("does not render the loading indicator when not fetching next page", () => {
    render(
      <VehiclesTableView
        isFetchingNextPage={false}
        ref={mockRef}
        isLoading={false}
        hasNextPage={false}
        vehicles={mockVehicles}
      />,
    );

    expect(screen.queryByTestId(/loading-icon/i)).not.toBeInTheDocument();
  });
});
