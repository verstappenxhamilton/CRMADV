import { describe, it, expect } from "vitest";
import { validateEnv } from "./env";

describe("Env validation", () => {
  it("allows MOCK_PROVIDERS=true in development", () => {
    const env = validateEnv({
      NODE_ENV: "development",
      MOCK_PROVIDERS: "true",
    });
    expect(env.MOCK_PROVIDERS).toBe(true);
    expect(env.NODE_ENV).toBe("development");
  });

  it("allows MOCK_PROVIDERS=false in production", () => {
    const env = validateEnv({
      NODE_ENV: "production",
      MOCK_PROVIDERS: "false",
    });
    expect(env.MOCK_PROVIDERS).toBe(false);
  });

  it("throws when MOCK_PROVIDERS=true in production", () => {
    expect(() =>
      validateEnv({
        NODE_ENV: "production",
        MOCK_PROVIDERS: "true",
      })
    ).toThrowError(/MOCK_PROVIDERS não pode ser 'true'/);
  });

  it("rejects invalid boolean strings", () => {
    expect(() => validateEnv({ MOCK_PROVIDERS: "banana" })).toThrow();
  });

  it("rejects invalid ports", () => {
    expect(() => validateEnv({ PORT: 0 })).toThrow();
    expect(() => validateEnv({ PORT: 70000 })).toThrow();
  });
});
