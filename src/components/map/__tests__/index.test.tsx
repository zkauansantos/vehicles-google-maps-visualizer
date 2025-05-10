import { render, screen } from "@testing-library/react";

import { Map } from "..";
import { useMapModel } from "../model";

jest.mock("../model", () => ({
  useMapModel: jest.fn(),
}));

jest.mock("../view", () => ({
  MapView: jest.fn(() => <div data-testid="map-view" />),
}));

describe("Map", () => {
  it("renders the MapView component", () => {
    render(<Map />);

    expect(screen.getByTestId("map-view")).toBeInTheDocument();
  });

  it("calls useMapModel hook", () => {
    render(<Map />);

    expect(useMapModel).toHaveBeenCalled();
  });
});
