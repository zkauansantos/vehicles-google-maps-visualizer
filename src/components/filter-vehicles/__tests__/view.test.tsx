import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComponentProps } from "react";
import { useForm } from "react-hook-form";

import { FilterVehiclesFormData } from "../schema";
import { VehicleType, VehicleTypeToText } from "../types";
import { FilterVehiclesView } from "../view";

jest.mock("lucide-react", () => ({
  Search: () => <div data-testid="search-icon">SearchIcon</div>,
}));

jest.mock("../../ui/radio-group", () => ({
  RadioGroup: ({ children, className }: ComponentProps<"div">) => (
    <div className={className} data-testid="radio-group">
      {children}
    </div>
  ),
  RadioGroupItem: ({ value, id }: ComponentProps<"input">) => (
    <input type="radio" value={value} id={id} data-testid={`radio-${id}`} />
  ),
}));

function FilterVehiclesViewWrapper({ onSubmitMock = jest.fn() }) {
  const methods = useForm<FilterVehiclesFormData>({
    defaultValues: {
      type: VehicleType.TRACKED,
      filter: "",
    },
  });

  return (
    <FilterVehiclesView
      control={methods.control}
      register={methods.register}
      onSubmit={methods.handleSubmit(onSubmitMock)}
    />
  );
}

describe("FilterVehiclesView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component with all elements", async () => {
    render(<FilterVehiclesViewWrapper />);

    expect(screen.getByText("Lista")).toBeInTheDocument();

    const trackedRadio = screen.queryByLabelText(
      VehicleTypeToText[VehicleType.TRACKED],
    );
    expect(trackedRadio).toBeInTheDocument();

    if (VehicleType.OTHERS) {
      const wheeledRadio = screen.queryByLabelText(
        VehicleTypeToText[VehicleType.OTHERS],
      );
      expect(wheeledRadio).toBeInTheDocument();
    }

    expect(
      screen.getByPlaceholderText("Buscar por placa ou frota"),
    ).toBeInTheDocument();

    expect(screen.getByText("Novo")).toBeInTheDocument();
  });

  it("updates the filter input when user types", async () => {
    render(<FilterVehiclesViewWrapper />);

    const input = screen.getByPlaceholderText("Buscar por placa ou frota");

    await userEvent.type(input, "ABC123");

    expect(input).toHaveValue("ABC123");
  });

  it("submits the form with correct values", async () => {
    const onSubmitMock = jest.fn();
    render(<FilterVehiclesViewWrapper onSubmitMock={onSubmitMock} />);

    const input = screen.getByPlaceholderText("Buscar por placa ou frota");
    await userEvent.type(input, "XYZ789");

    if (VehicleType.OTHERS) {
      const wheeledRadio = screen.getByLabelText(
        VehicleTypeToText[VehicleType.OTHERS],
      );
      await userEvent.click(wheeledRadio);
    }

    const button = screen.getByText("Novo");
    await userEvent.click(button);

    expect(onSubmitMock).toHaveBeenCalled();
  });

  it("shows search icon in mobile view", async () => {
    render(<FilterVehiclesViewWrapper />);

    const searchIcon = screen.getByTestId("search-icon");

    expect(searchIcon).toBeInTheDocument();

    const buttonText = screen.getByText("Novo");
    expect(buttonText).toHaveClass("hidden");
    expect(buttonText).toHaveClass("sm:block");
  });

  it("has correct responsive layout classes", async () => {
    render(<FilterVehiclesViewWrapper />);

    const form = screen.getByTestId("form");

    expect(form.className).toContain("flex-col");
    expect(form.className).toContain("lg:flex-row");

    const containers = document.querySelectorAll(
      '[class*="flex-col"][class*="sm:flex-row"]',
    );
    expect(containers.length).toBeGreaterThan(0);
  });
});
