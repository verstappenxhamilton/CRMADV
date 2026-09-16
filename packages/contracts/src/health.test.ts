import { describe, it, expect } from "vitest";
import { HealthCheckResponseSchema } from "./health";

describe("HealthCheckResponseSchema", () => {
  it("validates a healthy payload", () => {
    const valid = {
      status: "ok",
      timestamp: new Date().toISOString(),
      version: "0.1.0",
      uptimeSeconds: 120,
    };

    const parsed = HealthCheckResponseSchema.safeParse(valid);
    expect(parsed.success).toBe(true);
  });

  it("rejects invalid status", () => {
    const invalid = {
      status: "error",
      timestamp: new Date().toISOString(),
      version: "0.1.0",
      uptimeSeconds: 120,
    };

    const parsed = HealthCheckResponseSchema.safeParse(invalid);
    expect(parsed.success).toBe(false);
  });

  it("rejects invalid timestamp format", () => {
    const invalid = {
      status: "ok",
      timestamp: "not-a-date",
      version: "0.1.0",
      uptimeSeconds: 120,
    };

    const parsed = HealthCheckResponseSchema.safeParse(invalid);
    expect(parsed.success).toBe(false);
  });
});
