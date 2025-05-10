import { render, screen } from "@testing-library/react";

import { VehiclesTable } from "..";
import { useVehiclesTableModel } from "../model";

jest.mock("../model", () => ({
  useVehiclesTableModel: jest.fn(),
}));

jest.mock("../view", () => ({
  VehiclesTableView: jest.fn(() => <div data-testid="vehicles-table" />),
}));

describe("VehiclesTable", () => {
  it("renders the VehiclesTable component", () => {
    render(<VehiclesTable />);

    expect(screen.getByTestId("vehicles-table")).toBeInTheDocument();
  });

  it("calls useVehiclesTableModel hook", () => {
    render(<VehiclesTable />);

    expect(useVehiclesTableModel).toHaveBeenCalled();
  });
});
