import { QueryClient } from "@tanstack/react-query";

import { queryClient } from "../queryClient";

describe("queryClient", () => {
  it("should be an instance of QueryClient", () => {
    expect(queryClient).toBeInstanceOf(QueryClient);
  });
});
