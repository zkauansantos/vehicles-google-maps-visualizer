import { serverEnv } from "@/config/serverEnv";

import { httpServer } from "../httpServer";

describe("httpServer", () => {
  it("should be configured with the correct baseURL", () => {
    expect(httpServer.defaults.baseURL).toBe(serverEnv.apiUrl);
  });

  it("should include the correct Authorization header", () => {
    expect(httpServer.defaults.headers.Authorization).toBe(
      `Bearer ${serverEnv.authorizationApiKey}`,
    );
  });
});
