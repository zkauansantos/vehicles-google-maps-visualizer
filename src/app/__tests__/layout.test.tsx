import { render } from "@testing-library/react";

import RootLayout, { metadata } from "../layout";

describe("RootLayout", () => {
  it("renders the layout with children", () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>,
    );

    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("includes the Header component", () => {
    const { getByRole } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>,
    );

    expect(getByRole("banner")).toBeInTheDocument();
  });

  it("exports correct metadata", () => {
    expect(metadata.title).toBe("Control 361 Test - Kauan Santos");
    expect(metadata.description).toBe(
      "A simple test to test the knowledge of Kauan Santos",
    );
  });
});
