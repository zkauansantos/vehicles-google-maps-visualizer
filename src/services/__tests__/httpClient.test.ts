import { httpClient } from "../httpClient";

describe("httpClient", () => {
  it("should have the correct baseURL configured", () => {
    expect(httpClient.defaults.baseURL).toBe("/api");
  });
});
