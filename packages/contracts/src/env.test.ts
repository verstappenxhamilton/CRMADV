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
    expect(env.NODE_ENV).toBe("production");
  });

  it("throws an error when MOCK_PROVIDERS=true in production", () => {
    expect(() =>
      validateEnv({
        NODE_ENV: "production",
        MOCK_PROVIDERS: "true",
      })
    ).toThrowError(/CRÍTICO: MOCK_PROVIDERS não pode ser 'true' em ambiente de produção/);
  });
});
