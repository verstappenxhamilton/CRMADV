import { describe, it, expect } from "vitest";
import { GET } from "./route";
import { APP_VERSION, HealthCheckResponseSchema } from "@crmadv/contracts";

describe("GET /health/live", () => {
  it("returns HTTP 200 with schema-compliant payload", async () => {
    const response = await GET();
    expect(response.status).toBe(200);

    const data = await response.json();
    const parsed = HealthCheckResponseSchema.safeParse(data);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.status).toBe("ok");
      expect(parsed.data.version).toBe(APP_VERSION);
      expect(parsed.data.uptimeSeconds).toBeGreaterThanOrEqual(0);
    }
  });
});
