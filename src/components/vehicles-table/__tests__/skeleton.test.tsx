import { render, screen } from "@testing-library/react";

import { VehiclesTableSkeleton } from "../skeleton";

describe("VehiclesTableSkeleton", () => {
  it("renders the table headers correctly", () => {
    render(<VehiclesTableSkeleton />);

    expect(screen.getByText("Placa")).toBeInTheDocument();
    expect(screen.getByText("Frota")).toBeInTheDocument();
    expect(screen.getByText("Tipo")).toBeInTheDocument();
    expect(screen.getByText("Modelo")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders 20 rows of skeletons", () => {
    render(<VehiclesTableSkeleton />);

    const skeletonRows = screen.getAllByRole("row");

    expect(skeletonRows).toHaveLength(21);
  });

  it("renders skeleton cells in each row", () => {
    render(<VehiclesTableSkeleton />);

    const skeletonCells = screen.getAllByRole("cell");

    expect(skeletonCells).toHaveLength(100);
  });
});
