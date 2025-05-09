import { render, screen } from "@testing-library/react";

import { FilterVehicles } from "..";
import { useFilterVehiclesModel } from "../model";

jest.mock("../model", () => ({
  useFilterVehiclesModel: jest.fn(),
}));

jest.mock("../view", () => ({
  FilterVehiclesView: jest.fn(() => <div data-testid="filter-vehicles-view" />),
}));

describe("FilterVehicles", () => {
  it("renders the FilterVehiclesView component", () => {
    render(<FilterVehicles />);

    expect(screen.getByTestId("filter-vehicles-view")).toBeInTheDocument();
  });

  it("calls useFilterVehiclesModel hook", () => {
    render(<FilterVehicles />);

    expect(useFilterVehiclesModel).toHaveBeenCalled();
  });
});
