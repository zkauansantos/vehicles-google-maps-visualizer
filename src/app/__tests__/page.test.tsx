import { render, screen } from "@testing-library/react";

import Homepage from "../page";

jest.mock("@/components/filter-vehicles", () => ({
  FilterVehicles: () => <div data-testid="filter-vehicles" />,
}));

jest.mock("@/components/map", () => ({
  Map: () => <div data-testid="map" />,
}));

jest.mock("@/components/ui/separator", () => ({
  Separator: () => <div data-testid="separator" />,
}));

jest.mock("@/components/vehicles-table", () => ({
  VehiclesTable: () => <div data-testid="vehicles-table" />,
}));

describe("Homepage", () => {
  it("renders the FilterVehicles component", () => {
    render(<Homepage />);
    expect(screen.getByTestId("filter-vehicles")).toBeInTheDocument();
  });

  it("renders the Separator component", () => {
    render(<Homepage />);
    expect(screen.getByTestId("separator")).toBeInTheDocument();
  });

  it("renders the Map component", () => {
    render(<Homepage />);
    expect(screen.getByTestId("map")).toBeInTheDocument();
  });

  it("renders the VehiclesTable component", () => {
    render(<Homepage />);
    expect(screen.getByTestId("vehicles-table")).toBeInTheDocument();
  });
});
