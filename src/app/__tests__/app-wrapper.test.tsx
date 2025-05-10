import { render } from "@testing-library/react";

import { AppWrapper } from "../app-wrapper";

describe("AppWrapper", () => {
  it("should render children correctly", () => {
    function ChildComponent() {
      return <div>Test Child</div>;
    }

    const { getByText } = render(
      <AppWrapper>
        <ChildComponent />
      </AppWrapper>,
    );

    expect(getByText("Test Child")).toBeInTheDocument();
  });
});
